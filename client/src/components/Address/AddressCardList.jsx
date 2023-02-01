import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useEffect } from 'react'
import { AddressCard } from './AddressCard'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const tmpAddress = [
    {
        street: 'Arbel',
        houseNumber: '23',
        city: 'Reut',
        zipCode: '7179908',
        country: 'IL',
    },
    {
        street: 'Afik',
        houseNumber: '33',
        city: 'NesZiona',
        zipCode: '555',
        country: 'USA',
    },
    {
        street: 'Rotem',
        houseNumber: '55',
        city: 'Jerusalem',
        zipCode: '101010',
        country: 'IL',
    },
]

export const AddressCardList = (props) => {
    const { setIsNextAvailable, setChosenAddress, chosenAddress } = props
    const [isData, setIsData] = useState(false)
    const [addressList, setAddressList] = useState([])
    const { currentUser } = useAuth()

    async function fetchData() {
        try {
            const response = await axios.get(
                `http://localhost:2308/Address/User/${currentUser.localId}`
            )
            setAddressList([...response.data])
            setIsData(true)
        } catch (err) {
            console.log(err)
            setAddressList([...tmpAddress])
            //Consider set isData good and showing mock
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchData()
    }, [addressList])

    //  Also use effect wehn the array changes due deleting or editing

    return isData ? (
        addressList.map((address) => (
            <AddressCard
                key={address?._id}
                addressId={address?._id}
                street={address?.street}
                houseNumber={address?.houseNumber}
                city={address?.city}
                zipCode={address?.zipCode}
                country={address?.country}
                setIsNextAvailable={setIsNextAvailable}
                setChosenAddress={setChosenAddress}
                chosenAddress={chosenAddress}
            ></AddressCard>
        ))
    ) : (
        <Box>
            <Typography variant="h4" textAlign={'center'} gutterBottom>
                You have not set any addresses in your profile yet!
            </Typography>
        </Box>
    )
}
