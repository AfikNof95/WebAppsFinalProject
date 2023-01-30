import React, { useState, useContext, createContext, useEffect } from 'react'
import backendAPI from '../api'
import { useCookies } from 'react-cookie'
import { getTokenExpireDate } from '../utils/getTokenExpireDate'
import useWebSocket from 'react-use-websocket'

const AuthContext = createContext({
    signUp: async ({ email, password, imageURL, displayName }) => {},
    signIn: async ({ email, password }) => {},
    signOut: async () => {},
    updateUser: async (newUserDetails) => {},
    isUserSignedIn: () => {},
    getUser: () => {},
    refreshToken: async () => {},
    currentUser: null,
})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user-session'])
    const [currentUser, setCurrentUser] = useState(cookies['user-session'])
    const [userIcon, setIcon] = useState(0)
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(
        'ws://localhost:8000',
        {
            share: true,
            onOpen: () => {
                console.log('WebSocket opened')
            },
        }
    )

    async function signUp({ email, password, imageURL, displayName }) {
        const response = await backendAPI.auth.signUpWithEmailAndPassword(
            email,
            password
        )
        const userDetails = await backendAPI.user.update({
            ...response.data,
            displayName,
        })
        const { data } = userDetails
        const user = { ...response.data, ...data }

        user.expireDate = getTokenExpireDate(data.expiresIn)

        setCurrentUser(user)
        return data
    }

    async function signIn({ email, password }) {
        const response = await backendAPI.auth.signInWithEmailAndPassword(
            email,
            password
        )
        const { data } = response
        //Set the expiry date of the token, so we can use the refresh token to revoke our token.
        data.expireDate = getTokenExpireDate(data.expiresIn)
        setCurrentUser(data)
        setCookie('user-session', data)
        return data
    }

    function signOut() {
        setCurrentUser(null)
        removeCookie('user-session')
    }

    async function updateUser(newUserDetails) {
        const response = await backendAPI.user.update({
            ...currentUser,
            ...newUserDetails,
        })
        setCurrentUser((currentUserState) => {
            return { ...currentUserState, ...response.data }
        })
    }

    async function refreshToken() {
        const response = await backendAPI.auth.refreshToken(
            currentUser.refreshToken
        )
        const {
            id_token: idToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
        } = response.data

        setCurrentUser((currentUserState) => {
            return {
                ...currentUserState,
                ...{
                    idToken,
                    refreshToken,
                    expiresIn,
                    expireDate: getTokenExpireDate(expiresIn),
                },
            }
        })
        return { idToken }
    }

    useEffect(() => {
        if (lastJsonMessage !== null) {
            if (lastJsonMessage.type === 'REFRESH_TOKEN') {
                refreshToken()
            }
        }
    }, [lastJsonMessage])

    useEffect(() => {
        if (currentUser) {
            try {
                setCookie('user-session', currentUser)
                sendJsonMessage({ type: 'LOGIN', user: currentUser })
            } catch (ex) {
                console.error(ex)
            }
        }
    }, [currentUser, setCookie, sendJsonMessage])

    function getUserToken() {
        return isUserSignedIn() ? currentUser.getIdToken() : null
    }

    function isUserSignedIn() {
        return currentUser != null
    }

    function getUser() {
        return currentUser
    }

    const value = {
        currentUser,
        isUserSignedIn,
        signUp,
        signIn,
        signOut,
        updateUser,
        getUserToken,
        getUser,
        refreshToken,
        setIcon,
        userIcon,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
