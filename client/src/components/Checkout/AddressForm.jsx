import React, { useEffect, useState } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { Typography, Box, Button, Container, IconButton } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { AddressCardList } from '../Address/AddressCardList'
import AddIcon from '@mui/icons-material/Add'
import NewAddressForm from './NewAddressForm'
import axios from 'axios'

export default function AddressForm(props) {
    const {
        handleNext,
        isNewAddress,
        setIsNewAddress,
        currentUser,
        setAddressId,
    } = props
    const { handleChosenAddress } = useShoppingCart()
    const [isNextAvailable, setIsNextAvailable] = useState(false)
    const [chosenAddress, setChosenAddress] = useState({
        street: '',
        houseNumber: "",
        city: '',
        zipCode: "",
        country: '',
    })
    const [newAddressToSave, setNewAddressToSave] = useState({
        street: '',
        houseNumber: "",
        city: '',
        zipCode: "",
        country: '',
        isActive: true,
        user: currentUser.localId,
    })
    const navigate = useNavigate();
    const toggleChoose = () => {
        handleChosenAddress({   street: '',
        houseNumber: "",
        city: '',
        zipCode: "",
        country: '',});
        setAddressId("");
        setChosenAddress({   street: '',
        houseNumber: "",
        city: '',
        zipCode: "",
        country: '',})
        setIsNewAddress((prevIsNewAddress) => !prevIsNewAddress)
    }

    const handleNew = async () => {
        try {
            const response = await axios.post(
                `http://localhost:2308/Address/`,
                newAddressToSave,
                { headers: { 'Content-Type': 'application/json' } }
            )
            setAddressId(response.data._id)
        } catch (err) {
            console.log(err)
            alert(`oh no, ${err}`)
        } finally {
            handleNext()
        }
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
                    <NewAddressForm
                        setIsNextAvailable={setIsNextAvailable}
                        currentUser={currentUser}
                        newAddressToSave={newAddressToSave}
                        setNewAddressToSave={setNewAddressToSave}
                    />
                </>
            ) : (
                <>
                      <Box padding={3}>
                            <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                                <Typography variant='body1' fontWeight={"bold"} >
                                Choose one of your addresses, or add a new one
                                </Typography>
                                <IconButton
                                    sx={{backgroundColor:theme=>theme.palette.secondaryButton.main,color:"white", "&:hover":{
                                        backgroundColor:theme=>theme.palette.mainButton.main
                                    }}}
                                    color ="mainButton"
                                    onClick={toggleChoose}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <AddressCardList
                                setIsNextAvailable={setIsNextAvailable}
                                setChosenAddress={setChosenAddress}
                                chosenAddress={chosenAddress}
                                currentUser={currentUser}
                                setAddressId={setAddressId}
                            />
                        </Box>
                </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isNewAddress ? <Button key={"cancelNewAddress"} onClick={toggleChoose} sx={{ mt: 3, ml: 1 }} >
                    Cancel
                </Button>: <Button onClick={()=>navigate(-1)} sx={{ mt: 3, ml: 1 }} >
                    Go Back
                </Button>}
                
                <Button
                    variant="contained"
                    color="mainButton"
                    onClick={isNewAddress ? handleNew : handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={!isNextAvailable}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    )
}
