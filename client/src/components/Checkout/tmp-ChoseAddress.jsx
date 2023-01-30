import React, { useEffect, useState } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { Grid, Typography, TextField, Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function ChoseAddress(props) {
    // const { userInfo, handleFormChange } = useShoppingCart()
    // const { handleNext } = props
    // const [, ] = useState()

    return (
        <React.Fragment>
            <Typography
                variant="h6"
                sx={{ marginBottom: '1.5em' }}
                gutterBottom
            >
                Chose Address or add new one
            </Typography>
            <Grid container spacing={3}>
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
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button to="/" sx={{ mt: 3, ml: 1 }} component={RouterLink}>
                    Back home
                </Button>
                <Button
                    variant="contained"
                    // onClick={}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    )
}
