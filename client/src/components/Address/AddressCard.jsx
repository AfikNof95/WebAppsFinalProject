import React from 'react'
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
        address1,
        address2,
        city,
        state,
        zip,
        country,
        setIsNextAvailable,
        setChosenAddress,
        chosenAddress,
    } = props
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleSave = () => {
        // Save new Data
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onChoose = () => {
        try {
            setChosenAddress({ address1, address2, city, state, zip, country })
            setIsNextAvailable(true)
            // add style = box-shadow: 7px 7px 8px green;
        } catch (err) {
            console.log('Error! Could not set the ChosenAddress state')
        } finally {
            console.log('successfully chose address')
        }
    }

    const onRemove = () => {
        try {
            // Send delete to the server
            // get addresses again
        } catch (err) {
            console.log('Error! Could not delete the address')
        } finally {
            console.log('Deleted address?')
        }
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
                                id="address1"
                                name="address1"
                                value={address1}
                                placeholder={address1 ? address1 : 'Address...'}
                                variant="standard"
                                inputProps={{ maxLength: 22, minLength: 2 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="address2"
                                name="address2"
                                value={address2}
                                placeholder={
                                    address2 ? address2 : 'Address 2...'
                                }
                                variant="standard"
                                inputProps={{ maxLength: 22, minLength: 2 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                value={city}
                                placeholder={city ? city : 'City...'}
                                variant="standard"
                                inputProps={{ maxLength: 18, minLength: 2 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="state"
                                name="state"
                                value={state}
                                placeholder={state ? state : 'State...'}
                                variant="standard"
                                inputProps={{ maxLength: 20, minLength: 2 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                value={zip}
                                placeholder={zip ? zip : 'Zip...'}
                                variant="standard"
                                inputProps={{ maxLength: 8, minLength: 4 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                value={country}
                                placeholder={country ? country : 'Country...'}
                                variant="standard"
                                inputProps={{ maxLength: 22, minLength: 2 }}
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
                sx={{ display: 'flex', padding: 2, marginTop: 2 }}
                elevation={1}
            >
                <CardContent>
                    <Typography variant="body2" gutterBottom>
                        {address1}, {city}, {state}
                    </Typography>
                    {address2 && (
                        <Typography variant="body2" gutterBottom>
                            {address2}
                        </Typography>
                    )}

                    <Typography variant="body2">
                        {zip}, {country}
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
