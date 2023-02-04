import React, { Component, useState, useEffect, useRef  } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Paper, Typography, Avatar, Button, Grid, Divider } from "@mui/material";
import icons from "../Account/icons"
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { Link as RouterLink } from "react-router-dom";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AddressForm from "../Checkout/AddressForm";
import { tempOrders } from "./tempOrder";
import { LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend } 
from 'recharts'


const ProfilePage = () => {
  const { userProfilePicture, getUser } = useAuth();
  const theme = createTheme();
  let user = getUser()
  const inputAddress = useRef()
  const [orders, setOrders] = useState(tempOrders);
  const [adress, updateAddres] = useState("Israel")
  const [allAdresses, setAllAdresses] = useState([])
  const [insertAddress, setInsertAdress] = useState(false)
  let updateUserAdress = useRef()
  let dataPieChart = []
  let dataLineChart = []

  useEffect(() => {
    const fetchAddresses = async () => {
        const response = await axios.get(`http://localhost:2308/Address/user/${user.localId}`);
        setAllAdresses(response.data)
    }
    fetchAddresses()
  })

  useEffect(() => {
    const fetchOrdersByUserId = async () => {
      const response = await axios.get(`http://localhost:2308/Order`);
      console.log("----------------")
      console.log(response.data.orders)
      setOrders(response.data.orders);

    };
    fetchOrdersByUserId();
  }, []);

  const buildPieData = () => {
    let createdCounter = 0
    let deliveredCounter = 0
    let packedCounter = 0
    let i = 0
    for( const order of orders) {
      order.serial = i
      i++
      if(order.status == "Packed")
        packedCounter++
      else if(order.status == "Created")
        createdCounter++
      else 
        deliveredCounter++
    }
    
    dataPieChart = [
      { name: "Packed", value: packedCounter },
      { name: "Created", value: createdCounter },
      { name: "Delivered", value: deliveredCounter }
    ]
  }
  buildPieData()

  const buildLineData = () => {

    // When real data
    for(const add of allAdresses) {
      let counterAdd = 0
      for(const order of orders) {
        console.log(order)
        if(order.address._id == add._id) {
          console.log(add)
          counterAdd++
        }
      }
      dataLineChart.push({ city: add.city, orders: counterAdd })
    }
    if(dataLineChart.length < orders.length) {
      const sizeToAdd = orders.length - dataLineChart.length
      dataLineChart.push({ city: "Tel Aviv", orders: sizeToAdd })
    }
  }
  buildLineData()


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
      <Container component="main" maxWidth="big" sx={{ mb: 4, mt: 10 }}>
      <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Grid>
          
            <Avatar sx={{width: 80, height: 80}}> { userProfilePicture? icons[userProfilePicture] : <StarOutlineRoundedIcon/>} </Avatar>
            Hello {user.displayName}! 
            <Grid item  textAlign={'center'}>
              <Button sx= {{marginLeft:"1225px"}} variant="contained" color="inherit" size="large" width="7cm"
                component={RouterLink}
                to={"/account"}
              >
                Account
              </Button>
            </Grid>
            {
                insertAddress? 
                <div>
                    <AddressForm handleNext={createAddress}></AddressForm>
                </div>
                :
                <div>
                  <Typography  variant="h5" style={{marginBottom:"20px"}}>
                    {adress} &emsp;
                    <EditRoundedIcon onClick={() => { setInsertAdress(true)}}></EditRoundedIcon>
                  </Typography>
                  <Divider></Divider>
                  <Grid container gap={3} style={{marginTop:"40px"}}>
                  <h4>Price</h4>
                  <LineChart width={500} height={300} data={orders}>
                    <XAxis dataKey="serial"/>
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="totalPrice" stroke="#8884d8" />
                    <Line type="monotone" dataKey="serial" stroke="#82ca9d" />
                  </LineChart>
                  <h4>Status Order</h4>
                    <PieChart width={200} height={400}>
                      <Pie
                        isAnimationActive={false}
                        data={dataPieChart}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        label
                      />
                      <Tooltip />
                    </PieChart>
                    <Divider></Divider>
                    <h4>Address</h4>
                    <BarChart
                      width={500}
                      height={300}
                      data={dataLineChart}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#8884d8" />
                    </BarChart>
                    </Grid>
                  </div>
            }
            <Divider></Divider>
          </Grid>
      </Paper>
    </Container>
  </ThemeProvider>
  )
}


export default ProfilePage;
