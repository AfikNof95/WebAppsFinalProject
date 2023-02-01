import React, { Component, useState, useEffect, useRef  } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Paper, Typography, Avatar, Button, Input } from "@mui/material";
import icons from "../Account/icons"
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { Link as RouterLink } from "react-router-dom";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AddressForm from "../Checkout/AddressForm";

const ProfilePage = () => {
  const { userIcon, getUser } = useAuth();
  const theme = createTheme();
  let user = getUser()
  const inputAddress = useRef()
  const [orders, setOrders] = useState(null);
  const [adress, updateAddres] = useState("Israel")
  const [insertAddress, setInsertAdress] = useState(false)
  let updateUserAdress = useRef()

  useEffect(() => {
    const fetchOrdersByUserId = async () => {
      const response = await axios.get(`http://localhost:2308/Order`);
      setOrders(response.data);
    };
    fetchOrdersByUserId();
  }, []);


  useEffect(() => {
    updateUserAdress.current = async () => {
      const response = await axios.get(`http://localhost:2308/Address/user/${user.localId}`);
      const newAddress = response.data[response.data.length - 1]
      console.log(newAddress)
      updateAddres(`${newAddress.street} ${newAddress.houseNumber},
      ${newAddress.city}, ${newAddress.zipCodeCode},
      ${newAddress.country}.`)
    };
  }, []);


  const createAddress = (newAdress) => {
    setInsertAdress(false)
    updateUserAdress.current()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="big" sx={{ mb: 4, mt: 12 }}>
      <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          
            <Avatar sx={{width: 80, height: 80}}> { userIcon? icons[userIcon] : <StarOutlineRoundedIcon/>} </Avatar>
            Hello {user.displayName}! 
            {
                insertAddress? 
                <div>
                    <AddressForm handleNext={createAddress}></AddressForm>
                </div>
                :
                <Typography  variant="h5">
                  {adress} &emsp;
                  <EditRoundedIcon onClick={() => { setInsertAdress(true)}}></EditRoundedIcon>
                </Typography>
            }
        

          <Button sx= {{marginLeft:"1225px"}} variant="contained" color="inherit" size="large" width="7cm"
              component={RouterLink}
              to={"/account"}
          >
              Account
          </Button>
      </Paper>
    </Container>
  </ThemeProvider>
  )
}


export default ProfilePage;
