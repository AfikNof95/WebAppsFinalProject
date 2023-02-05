import React, { useEffect, useState } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { Typography, Box, Button, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AddressCardList } from '../Address/AddressCardList'
import AddIcon from '@mui/icons-material/Add'
import NewAddressForm from './NewAddressForm'
import axios from 'axios'

export default function AddressForm(props) {
    const {
        handleNext,
        isNewAddress,
        setIsNewAddress,
        currentUser,
        setAddressId,
    } = props
    const { handleChosenAddress } = useShoppingCart()
    const [isNextAvailable, setIsNextAvailable] = useState(false)
    const [chosenAddress, setChosenAddress] = useState({
        street: '',
        houseNumber: null,
        city: '',
        zipCode: null,
        country: '',
    })
    const [newAddressToSave, setNewAddressToSave] = useState({
        street: '',
        houseNumber: null,
        city: '',
        zipCode: null,
        country: '',
        isActive: true,
        user: currentUser.localId,
    })

    const toggleChoose = () => {
        setIsNewAddress((prevIsNewAddress) => !prevIsNewAddress)
    }

    const handleNew = async () => {
        try {
            const response = await axios.post(
                `http://localhost:2308/Address/`,
                newAddressToSave,
                { headers: { 'Content-Type': 'application/json' } }
            )
            setAddressId(response.data._id)
        } catch (err) {
            console.log(err)
            alert(`oh no, ${err}`)
        } finally {
            handleNext()
        }
    }

    useEffect(() => {
        async function setAddress() {
            handleChosenAddress(chosenAddress)
            await new Promise((r) => setTimeout(r, 3000))
        }
        setAddress()
    }, [chosenAddress])

    return (
        <React.Fragment>
            <Typography
                variant="h6"
                sx={{ marginBottom: '1.5em' }}
                gutterBottom
            >
                Shipping address
            </Typography>
            {isNewAddress ? (
                <>
                    <div>
                        <hr />
                        Add your new address, OR{' '}
                        <Button variant="outlined" onClick={toggleChoose}>
                            Use Known Address
                        </Button>
                        <div></div>
                        <hr />
                        <div></div>
                    </div>
                    <NewAddressForm
                        setIsNextAvailable={setIsNextAvailable}
                        currentUser={currentUser}
                        newAddressToSave={newAddressToSave}
                        setNewAddressToSave={setNewAddressToSave}
                    />
                </>
            ) : (
                <>
                    <Container maxWidth="sm">
                        <Box>
                            <div>
                                Choose one of your addresses, OR{' '}
                                <Button
                                    variant="outlined"
                                    onClick={toggleChoose}
                                >
                                    <AddIcon />
                                    Add new one
                                </Button>
                            </div>
                            <AddressCardList
                                setIsNextAvailable={setIsNextAvailable}
                                setChosenAddress={setChosenAddress}
                                chosenAddress={chosenAddress}
                                currentUser={currentUser}
                                setAddressId={setAddressId}
                            />
                        </Box>
                    </Container>
                </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button to="/" sx={{ mt: 3, ml: 1 }} component={RouterLink}>
                    Back home
                </Button>
                <Button
                    variant="contained"
                    onClick={isNewAddress ? handleNew : handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={!isNextAvailable}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    )
}
