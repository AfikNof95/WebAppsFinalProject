import React, { useState } from 'react'
import { CssBaseline, Container, Paper, Stepper } from '@mui/material'
import { StepLabel, Typography, Step } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'

const steps = ['Shipping address', 'Payment details', 'Review your order']
const theme = createTheme()

export default function NewCheckout() {
    const [activeStep, setActiveStep] = useState(0)

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm handleNext={handleNext} />
            case 1:
                return (
                    <PaymentForm
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )
            case 2:
                return (
                    <Review handleNext={handleNext} handleBack={handleBack} />
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 12 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
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
        </ThemeProvider>
    )
}
