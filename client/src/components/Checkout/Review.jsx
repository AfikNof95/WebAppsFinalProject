import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'
import { Grid, Box, Button, Stack } from '@mui/material'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import omit from 'lodash/omit'
import ReviewProdList from './ReviewProdList'
import axios from 'axios'
// import mongoose from 'mongoose'

// const mongoose = require(mongoose)

export default function Review(props) {
    const { handleNext, handleBack, currentUser, addressId } = props
    const {
        paymentInfo,
        userInfo,
        getCartProducts,
        getCartTotalPrice,
        deleteCart,
        removePaymentInfo,
        removeUserInfo,
    } = useShoppingCart()

    const cartProducts = getCartProducts()
    const sumOrder = getCartTotalPrice()
    let convertedId;
    //const convertedId = mongoose.Types.ObjectId(addressId)
    // console.log(convertedId)

    const orderToSend = {
        user: currentUser.localId,
        address: convertedId ? convertedId : addressId,
        products: cartProducts,
        totalPrice: sumOrder,
    }

    const finishReservation = async () => {
        try {
            const response = await axios.post(
                `http://localhost:2308/Order/`,
                orderToSend,
                { headers: { 'Content-Type': 'application/json' } }
            )
            alert(response)
        } catch (error) {
            console.error(error)
        } finally {
            // deleteCart()
            // removePaymentInfo()
            // removeUserInfo()
        }
    }

    const handleFinish = () => {
        console.log(orderToSend)
        finishReservation()
        // handleNext()
        // console.log(orderToSend)
    }

    const last4digits = paymentInfo?.cardNumber.substr(-4)
    const payments = [
        { name: 'Card holder', detail: paymentInfo.cardName },
        { name: 'Card number', detail: `xxxx-xxxx-xxxx-${last4digits}` },
    ]
    const shippingUser =
        Object.values(
            omit(userInfo, [
                'street',
                'houseNumber',
                'city',
                'zipCode',
                'country',
            ])
        )
            .filter(Boolean)
            .join(' ') || currentUser.displayName

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <hr />
            <List disablePadding>
                <Stack direction={'column'} gap={3} minWidth={500}>
                    <ReviewProdList />
                </Stack>
                <hr />
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {sumOrder}
                    </Typography>
                </ListItem>
            </List>
            <hr />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ mt: 2 }}
                    >
                        Shipping
                    </Typography>
                    <Typography align="center" gutterBottom>
                        {shippingUser}
                    </Typography>
                    <Typography align="center" gutterBottom>
                        {Object.values(omit(userInfo, ['fName', 'lName']))
                            .filter(Boolean)
                            .join(', ')}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ mt: 2 }}
                    >
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography align="center" gutterBottom>
                                        {payment.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align="center" gutterBottom>
                                        {payment.detail}
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={handleFinish}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Place order
                </Button>
            </Box>
        </React.Fragment>
    )
}
