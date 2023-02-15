import "./Checkout.css"
import React, { useState } from 'react'
import { CssBaseline, Container, Paper, Stepper } from '@mui/material'
import { StepLabel, Typography, Step } from '@mui/material'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import { useAuth } from '../../context/AuthContext'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { useNavigate } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details', 'Review your order']

export default function NewCheckout() {
    const [activeStep, setActiveStep] = useState(0)
    const [isNewAddress, setIsNewAddress] = useState(false)
    const [addressId, setAddressId] = useState('')
    const [boxShadowColor, setBoxShadowColor] = useState('')
    const { currentUser } = useAuth()
    const {getCartQuantity,isShoppingCartLoading} = useShoppingCart();
    const navigate = useNavigate();

    if(!isShoppingCartLoading && getCartQuantity() <=0 && activeStep < 2){
        navigate('/');
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <AddressForm
                        handleNext={handleNext}
                        isNewAddress={isNewAddress}
                        setIsNewAddress={setIsNewAddress}
                        currentUser={currentUser}
                        setAddressId={setAddressId}
                        boxShadowColor={boxShadowColor}
                        setBoxShadowColor={setBoxShadowColor}
                    />
                )
            case 1:
                return (
                    <PaymentForm
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )
            case 2:
                return (
                    <Review
                        handleNext={handleNext}
                        handleBack={handleBack}
                        currentUser={currentUser}
                        addressId={addressId}
                    />
                )
            default:
                throw new Error('Unknown step')
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    return (
            <Container component="main" maxWidth="md" sx={{ mb: 4, mt: 12 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} className={"stepper"}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Thank you for your order.
                            </Typography>
                            <Typography align="center" variant="subtitle1">
                                Your order number is #122344. We have emailed
                                your order confirmation, and will send you an
                                update when your order has shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
    )
}
