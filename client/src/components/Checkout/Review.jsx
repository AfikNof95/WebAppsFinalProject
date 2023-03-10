import React, { useState } from 'react'
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material'
import { Grid, Box, Button, Stack } from '@mui/material'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import omit from 'lodash/omit'
import ReviewProdList from './ReviewProdList'
import backendAPI from '../../api'
import { useAuth } from '../../context/AuthContext'

export default function Review(props) {
    const { handleNext, handleBack,addressId } = props
    const {currentUser} =  useAuth();
    const {
        paymentInfo,
        userInfo,
        getCartProducts,
        getCartTotalPrice,
        getCartTotalPriceNumber,
        deleteCart,
        removePaymentInfo,
        removeUserInfo,
    } = useShoppingCart()
    const [showOutOfStockError,setShowOutOfStockError] = useState(false);

    const cartProducts = getCartProducts()
    const ordersPrice = getCartTotalPrice()
    const sumOrder = getCartTotalPriceNumber()

    const orderToSend = {
        user: currentUser.localId,
        address: addressId,
        products: cartProducts,
        totalPrice: sumOrder,
    }

    const finishReservation = async () => {
        try {
            // send put or post to server.
            const order ={
                products:getCartProducts(),
                user:currentUser.localId,
                address:addressId
            }
            const resposne = await backendAPI.order.create(order)
            deleteCart()
            removePaymentInfo()
            removeUserInfo()
            handleNext()
        } catch (err) {
            console.error(err);
            if(err.response.data.error && err.response.data.error.message === "OUT_OF_STOCK"){
                setShowOutOfStockError(true);
            }
        }
    }

    const handleFinish = () => {
        finishReservation()
    }

    const last4digits = paymentInfo?.cardNumber.substr(-4)
    const payments = [
        { name: 'Card holder', detail: paymentInfo.cardName },
        { name: 'Card number', detail: `xxxx-xxxx-xxxx-${last4digits}` },
    ]
    const shippingUser =currentUser.displayName

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <hr />
            <List disablePadding>
                <Stack direction={'column'} gap={3} >
                    <ReviewProdList />
                </Stack>
                <hr />
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {ordersPrice}
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
                        Name: {shippingUser}
                    </Typography>
                    <Typography align="center" gutterBottom>
                        Address: {Object.values(omit(userInfo, ['fName', 'lName',"addressId"]))
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
            {showOutOfStockError && <Box width={"100%"}>
            <Alert severity="error" variant="filled" sx={{ width: '100%', marginTop: 1 }}>
                        Some of the products in your cart are out of stock, please remove them before continuing.
                      </Alert>
                </Box>}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>
                <Button
                color="mainButton"
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

