import axios from 'axios'

const firebaseConfig = {
    apiKey: 'AIzaSyCPHJfNEGeaNbsPRkPbiKAG2B-7lAz_kIk',
    authDomain: 'reacct-final-effi.firebaseapp.com',
    projectId: 'reacct-final-effi',
    storageBucket: 'reacct-final-effi.appspot.com',
    messagingSenderId: '564105219065',
    appId: '1:564105219065:web:9e56aa967e7974f04b8b28',
    measurementId: 'G-W9X24DV2PJ',
}

const REST_API = {
    auth: {
        signInWithEmailAndPassword:
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
        signUpWithEmailAndPassword:
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
        refreshToken: 'https://identitytoolkit.googleapis.com/v1/token?key=',
    },
    user: {
        updateUser:
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
    },
    product: {
        get: 'http://localhost:2308/Product/id',
        getGroupByCategories: 'http://localhost:2308/Product/Group/Category',
    },
    cart: {
        get: 'http://localhost:2308/Cart/User',
        update: 'http://localhost:2308/Cart/User',
    },
    admin: {
        user: {
            isAdmin: 'http://localhost:2308/Admin',
            getAll: 'http://localhost:2308/Admin/User/All',
            getAddresses: 'http://localhost:2308/Admin/Address/User',
            update: 'http://localhost:2308/Admin/User',
            analytics: 'http://localhost:2308/Admin/User/Analytics',
        },
        category: {
            getAll: 'http://localhost:2308/Admin/Category',
        },
        product: {
            getAll: 'http://localhost:2308/Admin/Product',
            create: 'http://localhost:2308/Admin/Product',
            update: 'http://localhost:2308/Admin/Product',
            analytics: 'http://localhost:2308/Admin/Product/Analytics',
        },
        order: {
            getAll: 'http://localhost:2308/Admin/Order',
            update: 'http://localhost:2308/Admin/Order',
            analytics: 'http://localhost:2308/Admin/Order/Analytics',
        },
    },
}

const getAPIURL = (url) => {
    return url + firebaseConfig.apiKey
}

const backendAPI = {
    /** Auth API */
    auth: {
        async signInWithEmailAndPassword(email, password) {
            return await axios.post(
                getAPIURL(REST_API.auth.signInWithEmailAndPassword),
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            )
        },
        async signUpWithEmailAndPassword(email, password) {
            return await axios.post(
                getAPIURL(REST_API.auth.signUpWithEmailAndPassword),
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            )
        },
        async refreshToken(refreshToken) {
            return await axios.post(getAPIURL(REST_API.auth.refreshToken), {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            })
        },
    },

    /**User API */
    user: {
        async update(user) {
            return await axios.post(getAPIURL(REST_API.user.updateUser), user)
        },
    },

    /** Product API */
    product: {
        async get(productId) {
            return await axios.get(REST_API.product.get + `/${productId}`)
        },
        async getGroupByCategories() {
            return await axios.get(REST_API.product.getGroupByCategories)
        },
    },

    /** Cart API */
    cart: {
        async get(userId) {
            return await axios.get(REST_API.cart.get + `/${userId}`)
        },
        async update(userId, products) {
            return await axios.put(REST_API.cart.update + `/${userId}`, {
                products,
            })
        },
    },

    /**Admin API */
    admin: {
        user: {
            async isAdmin(token) {
                return await axios.post(
                    REST_API.admin.user.isAdmin,
                    { token },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    }
                )
            },
            async getAll(token) {
                return await axios.get(REST_API.admin.user.getAll, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            },
            async getAddresses(userId) {
                return await axios.get(
                    REST_API.admin.user.getAddresses + `/${userId}`
                )
            },
            async update(newUserDetails, token) {
                return await axios.put(
                    REST_API.admin.user.update,
                    {
                        ...newUserDetails,
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    }
                )
            },
            async analytics() {
                return await axios.get(REST_API.admin.user.analytics)
            },
        },
        product: {
            async getAll(token) {
                return await axios.get(REST_API.admin.product.getAll, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            },
            async create(newProductDetails) {
                return await axios.post(REST_API.admin.product.create, {
                    ...newProductDetails,
                })
            },
            async update(newProductDetails) {
                return await axios.put(
                    REST_API.admin.product.update + `/${newProductDetails._id}`,
                    {
                        ...newProductDetails,
                    }
                )
            },
            async analytics() {
                return await axios.get(REST_API.admin.product.analytics)
            },
        },
        category: {
            async getAll(token) {
                return await axios.get(REST_API.admin.category.getAll)
            },
        },
        order: {
            async getAll() {
                return await axios.get(REST_API.admin.order.getAll)
            },
            async update(updatedOrder) {
                return await axios.put(
                    REST_API.admin.order.update + `/${updatedOrder._id}`,
                    updatedOrder
                )
            },
            async analytics() {
                return await axios.get(REST_API.admin.order.analytics)
            },
        },
    },
}

export default backendAPI
