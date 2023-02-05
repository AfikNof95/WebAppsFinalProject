import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useEffect } from 'react'
import { AddressCard } from './AddressCard'
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
    const {
        setIsNextAvailable,
        setChosenAddress,
        chosenAddress,
        currentUser,
        setAddressId,
    } = props
    const [isData, setIsData] = useState(false)
    const [addressList, setAddressList] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)

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
            setIsData(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAddressSave = (newAddressData)=>{
        setAddressList((currentState)=>{
            return currentState.map(address=>{
                if(address._id === newAddressData.addressId){
                    return {...address,...newAddressData};
                }
                return address;
            })
        })
    }
    

    //  Also use effect wehn the array changes due deleting or editing

    return isData ? (
        addressList.map((address) => (
            <AddressCard
                key={address?._id}
                addressId={address?._id}
                user={address.user}
                street={address?.street}
                houseNumber={address?.houseNumber}
                city={address?.city}
                zipCode={address?.zipCode}
                country={address?.country}
                currentUser={currentUser}
                setAddressId={setAddressId}
                setIsNextAvailable={setIsNextAvailable}
                setChosenAddress={setChosenAddress}
                chosenAddress={chosenAddress}
                emitAddressUpdate={handleAddressSave}
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
