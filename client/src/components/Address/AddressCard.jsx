import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Button,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogActions,
    Grid,
} from '@mui/material'

export function AddressCard(props) {
    const {
        addressId,
        street,
        houseNumber,
        city,
        state,
        zipCode,
        country,
        currentUser,
        setAddressId,
        setIsNextAvailable,
        setChosenAddress,
        setShouldRefetch,
        chosenAddress,
    } = props
    const [open, setOpen] = React.useState(false)
    const [updatedAddress, setUpdatedAddress] = useState({
        street: street,
        houseNumber: houseNumber,
        city: city,
        zipCode: zipCode,
        country: country,
        isActive: true,
        user: currentUser.localId,
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://localhost:2308/Address/id/${addressId}`,
                updatedAddress,
                { headers: { 'Content-Type': 'application/json' } }
            )
            setShouldRefetch(true)
        } catch (error) {
            console.error(error)
        }
        setOpen(false)
    }

    const onRemove = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:2308/Address/id/${addressId}`
            )
            setShouldRefetch(true)
            console.log(response.data)
        } catch (err) {
            console.log('Error! Could not delete the address')
            console.log(err)
        }
    }

    const onChoose = () => {
        try {
            setChosenAddress({
                street,
                houseNumber,
                city,
                state,
                zipCode,
                country,
            })
            setAddressId(addressId)
            setIsNextAvailable(true)
        } catch (err) {
            console.log('Error! Could not set the ChosenAddress state')
        } finally {
            console.log('successfully chose address')
        }
    }

    const handleChange = async (event) => {
        setUpdatedAddress({
            ...updatedAddress,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please edit your address
                    </DialogContentText>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Street"
                                id="street"
                                name="street"
                                placeholder={street ? street : 'Street...'}
                                variant="standard"
                                inputProps={{ maxLength: 22, minLength: 2 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="houseNumber"
                                name="houseNumber"
                                label="House Number"
                                placeholder={
                                    houseNumber
                                        ? houseNumber
                                        : 'House number...'
                                }
                                variant="standard"
                                inputProps={{ maxLength: 10, minLength: 1 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                placeholder={city ? city : 'City...'}
                                variant="standard"
                                inputProps={{ maxLength: 24, minLength: 2 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="zipCode"
                                name="zipCode"
                                label="Zip"
                                placeholder={zipCode ? zipCode : 'zipCode...'}
                                variant="standard"
                                inputProps={{ maxLength: 8, minLength: 4 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                placeholder={country ? country : 'Country...'}
                                variant="standard"
                                inputProps={{ maxLength: 22, minLength: 2 }}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            <Card
                sx={
                    chosenAddress._id == addressId
                        ? {
                              display: 'flex',
                              padding: 2,
                              marginTop: 2,
                              boxShadow: `0 0 10px blue`,
                          }
                        : {
                              display: 'flex',
                              padding: 2,
                              marginTop: 2,
                              boxShadow: `0 0 10px black`,
                          }
                }
                elevation={1}
            >
                <CardContent>
                    <Typography variant="body2" gutterBottom>
                        {street} {houseNumber}, {city}
                    </Typography>
                    <Typography variant="body2">
                        {zipCode}, {country}
                    </Typography>
                </CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-end',
                        width: '60%',
                    }}
                >
                    <CardActions>
                        <Button size="small" onClick={onChoose}>
                            Choose
                        </Button>
                        <Button size="small" onClick={handleClickOpen}>
                            Edit
                        </Button>
                        <Button size="small" onClick={onRemove}>
                            Remove
                        </Button>
                    </CardActions>
                </Box>
            </Card>
        </>
    )
}
