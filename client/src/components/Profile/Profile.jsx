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
  const { userIcon, getUser } = useAuth();
  const theme = createTheme();
  let user = getUser()
  const inputAddress = useRef()
  const [orders, setOrders] = useState(null);
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

  const buildPieData = () => {
    let createdCounter = 0
    let deliveredCounter = 0
    let packedCounter = 0
    for( const order of tempOrders) {
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

    dataLineChart = [
      {address: "bla", orders: 1},
      {address: "Tel aviv", orders: 4},
      {address: "pp", orders: 0}
    ]
    // When real data
    // for(const add of allAdresses) {
    //   let counterAdd = 0
    //   for(const order of tempOrders) {
    //     if(order.address == add)
    //       counterAdd++
    //   }
    //   dataLineChart.push({name: add, value: counterAdd})
    // }
  }
  buildLineData()

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
      ${newAddress.city}, ${newAddress.zipCode},
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
          <Grid>
          
            <Avatar sx={{width: 80, height: 80}}> { userIcon? icons[userIcon] : <StarOutlineRoundedIcon/>} </Avatar>
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
                  <LineChart width={500} height={300} data={tempOrders}>
                    <XAxis dataKey="serial"/>
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="totalPrice" stroke="#8884d8" />
                    <Line type="monotone" dataKey="serial" stroke="#82ca9d" />
                  </LineChart>
            
                    <PieChart width={400} height={400}>
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
                      <XAxis dataKey="address" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#8884d8" />
                    </BarChart>
                    </Grid>
                  </div>
            }
          </Grid>
      </Paper>
    </Container>
  </ThemeProvider>
  )
}


export default ProfilePage;
