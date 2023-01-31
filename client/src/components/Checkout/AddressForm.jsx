import React, { useEffect, useState } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { Typography, Box, Button, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AddressCardList } from '../Address/AddressCardList'
import AddIcon from '@mui/icons-material/Add'
import NewAddressForm from './NewAddressForm'

export default function AddressForm(props) {
    const { handleNext, isNewAddress, setIsNewAddress } = props
    const { handleChosenAddress } = useShoppingCart()
    const [isNextAvailable, setIsNextAvailable] = useState(false)
    const [chosenAddress, setChosenAddress] = useState({
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    })

    const toggleChoose = () => {
        setIsNewAddress((prevIsNewAddress) => !prevIsNewAddress)
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
                    <NewAddressForm setIsNextAvailable={setIsNextAvailable} />
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
                                    Add temp one
                                </Button>
                            </div>
                            <AddressCardList
                                setIsNextAvailable={setIsNextAvailable}
                                setChosenAddress={setChosenAddress}
                                chosenAddress={chosenAddress}
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
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={!isNextAvailable}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    )
}
