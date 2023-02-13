import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import { useShoppingCart } from '../../context/ShoppingCartContext'

export default function NewAddressForm(props) {
    const { setIsNextAvailable, setNewAddressToSave, newAddressToSave } = props
    const { userInfo, handleFormChange } = useShoppingCart()

    const checkFormValidation = () => {
        for (let contactInfoField of Object.keys(userInfo)) {
            if (
                !(contactInfoField == 'houseNumber') &&
                !(contactInfoField == 'zipCode') &&
                userInfo[contactInfoField].trim() === ''
            ) {
                setIsNextAvailable(false)
                return
            } else if (
                contactInfoField == 'houseNumber' &&
                userInfo[contactInfoField] === ''
            ) {
                setIsNextAvailable(false)
                return
            } else if (
                contactInfoField == 'zipCode' &&
                userInfo[contactInfoField] === ''
            ) {
                setIsNextAvailable(false)
                return
            }
        }
        setIsNextAvailable(true)
        return
    }

    const handleNewAddressChange = (event) => {
        handleFormChange(event)
        if (
            !(event.target.name == 'fName') &&
            !(event.target.name == 'lName')
        ) {
            setNewAddressToSave({
                ...newAddressToSave,
                [event.target.name]: event.target.value,
            })
        }
    }

    useEffect(() => {
        checkFormValidation()
    }, [])

    useEffect(() => {
        checkFormValidation()
    }, [userInfo])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="fName"
                        label="First name"
                        value={userInfo?.fName && userInfo.fName}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        inputProps={{ maxLength: 14, minLength: 2 }}
                        onChange={handleNewAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lName"
                        label="Last name"
                        value={userInfo?.lName && userInfo.lName}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        inputProps={{ maxLength: 14, minLength: 2 }}
                        onChange={handleNewAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="street"
                        name="street"
                        label="Street"
                        value={userInfo?.street && userInfo.street}
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        inputProps={{ maxLength: 22, minLength: 2 }}
                        onChange={handleNewAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="houseNumber"
                        name="houseNumber"
                        label="House number"
                        value={userInfo?.houseNumber && userInfo.houseNumber}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        inputProps={{ maxLength: 22, minLength: 2 }}
                        onChange={handleNewAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        value={userInfo.city && userInfo.city}
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        inputProps={{ maxLength: 24, minLength: 2 }}
                        onChange={handleNewAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        value={userInfo?.country && userInfo?.country}
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        inputProps={{ maxLength: 22, minLength: 2 }}
                        onChange={handleNewAddressChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zipCode"
                        name="zipCode"
                        label="Zip / Postal code"
                        value={userInfo?.zipCode && userInfo.zipCode}
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        inputProps={{ maxLength: 8, minLength: 4 }}
                        onChange={handleNewAddressChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
