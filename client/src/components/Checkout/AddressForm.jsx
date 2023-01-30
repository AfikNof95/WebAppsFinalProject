import React, { useEffect, useState } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { Grid, Typography, TextField, Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AddressCardList } from '../Address/AddressCardList'
import AddIcon from '@mui/icons-material/Add'
// import { useAuth } from '../../context/AuthContext'

export default function AddressForm(props) {
    const { userInfo, handleFormChange } = useShoppingCart()
    const { handleNext } = props
    const [isNextAvailable, setIsNextAvailable] = useState(false)
    const [isNewAddress, setIsNewAddress] = useState(false)
    const [isAddressChosen, setIsAddressChosen] = useState(false)

    const checkFormValidation = () => {
        if (isNewAddress) {
            for (let contactInfoField of Object.keys(userInfo)) {
                if (
                    userInfo[contactInfoField].trim() === '' &&
                    !(contactInfoField == 'address2')
                ) {
                    setIsNextAvailable(false)
                    return
                }
            }
        } else if (!isAddressChosen) {
            setIsNextAvailable(false)
            return
        }
        setIsNextAvailable(true)
        return
    }

    useEffect(() => {
        checkFormValidation()
    }, [])

    useEffect(() => {
        checkFormValidation()
    }, [userInfo])

    const toggleChoose = () => {
        setIsNewAddress((prevIsNewAddress) => !prevIsNewAddress)
    }

    return (
        <React.Fragment>
            <Typography
                variant="h6"
                sx={{ marginBottom: '1.5em' }}
                gutterBottom
            >
                Shipping address
            </Typography>
            Chose one of your addresses
            {isNewAddress ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="fName"
                            label="First name"
                            value={userInfo?.fName && userInfo.fName}
                            placeholder={!userInfo?.fName && 'First Name...'}
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            inputProps={{ maxLength: 14, minLength: 2 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lName"
                            label="Last name"
                            value={userInfo?.lName && userInfo.lName}
                            placeholder={!userInfo?.lName && 'Last Name...'}
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            inputProps={{ maxLength: 14, minLength: 2 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Address line 1"
                            value={userInfo?.address1 && userInfo.address1}
                            placeholder={!userInfo?.address1 && 'Address...'}
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="standard"
                            inputProps={{ maxLength: 22, minLength: 2 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Address line 2"
                            value={userInfo?.address2 && userInfo.address2}
                            placeholder={!userInfo?.address2 && 'Address 2...'}
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="standard"
                            inputProps={{ maxLength: 22, minLength: 2 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            value={userInfo.city && userInfo.city}
                            placeholder={!userInfo.city && 'City...'}
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="standard"
                            inputProps={{ maxLength: 18, minLength: 2 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            value={userInfo?.state && userInfo.state}
                            placeholder={!userInfo?.state && 'State...'}
                            fullWidth
                            variant="standard"
                            inputProps={{ maxLength: 20, minLength: 2 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            value={userInfo?.zip && userInfo.zip}
                            placeholder={!userInfo?.zip && 'Zip...'}
                            fullWidth
                            autoComplete="shipping postal-code"
                            variant="standard"
                            inputProps={{ maxLength: 8, minLength: 4 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            value={userInfo?.country && userInfo?.country}
                            placeholder={!userInfo?.country && 'Country...'}
                            fullWidth
                            autoComplete="shipping country"
                            variant="standard"
                            inputProps={{ maxLength: 22, minLength: 2 }}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Button variant="outlined" onClick={toggleChoose}>
                        Use Known Address
                    </Button>
                </Grid>
            ) : (
                <Grid container spacing={3}>
                    <AddressCardList />
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    Or{' '}
                    <Button variant="outlined" onClick={toggleChoose}>
                        <AddIcon />
                    </Button>{' '}
                    new one
                </Grid>
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
