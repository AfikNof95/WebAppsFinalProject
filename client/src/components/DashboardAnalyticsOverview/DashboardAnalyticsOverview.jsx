import "./style.css";
import { Avatar, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import UsersIcon from '@mui/icons-material/Group';
import ProfitIcon from '@mui/icons-material/AttachMoney';
import OrdersIcon from '@mui/icons-material/ReceiptLong';
import ShippedIcon from '@mui/icons-material/LocalShipping';
import PackedIcon from '@mui/icons-material/Inventory';

import { formatPrice } from '../../utils/formatPrice';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GroupAdd, GroupAddOutlined } from '@mui/icons-material';
import { useWebSocketServer } from '../../context/WebSocketContext';
let timeout;
const DashboardAnalyticsOverview = ({ users, orders, products }) => {
  const [socketUrl, setSocketUrl] = useState('ws://localhost:2309');

  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [isUserAnalyticsLoading, setIsUserAnalyticsLoading] = useState(true);
  const [isOrdersAnalyticsLoading, setIsOrdersAnalyticsLoading] = useState(true);
  const [isProductsAnalyticsLoading, setIsProductsAnalyticsLoading] = useState(true);
  const [newUsers, setNewUsers] = useState(0);
  const [notifyUserChange,setNotifyUserChange] = useState(false);

  const [productsCategoryPieChart, setProductsCategoryPieChart] = useState([]);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const { lastJsonMessage, lastMessage, sendJsonMessage, readyState } = useWebSocketServer();

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('Connecting To WebSocket Server...');
      sendJsonMessage({ type: 'ADMIN_READY' });
    }
  }, [readyState]);


useEffect(()=>{
  if(timeout){
    clearTimeout(timeout);
  }
  setNotifyUserChange(true);
 timeout = setTimeout(()=>{
  setNotifyUserChange(false);
},500)
},[loggedInUsers])

  useEffect(() => {
    if (lastJsonMessage !== null && lastJsonMessage.currentLoggedInUsers) {
      setLoggedInUsers(lastJsonMessage.currentLoggedInUsers);
    }
  }, [lastJsonMessage]);

  const COLORS = ['#cea9bc', '#8464a0', '#323232', '#0a417a', '#72b4eb', '#2085ec'];

  useEffect(() => {
    if (users) {
      setNewUsers(users.newUsers);
      setIsUserAnalyticsLoading(false);
    }
    if (orders) {
      setIsOrdersAnalyticsLoading(false);
      setMonthlyProfit(() => {
        const data = orders.monthlyProfit.filter(
          (date) =>
            date._id.month === new Date().getMonth() + 1 &&
            date._id.year === new Date().getFullYear()
        );
        if (data[0]) {
          return data[0].profit;
        }
        return 0;
      });
    }
    if (products) {
      setProductsCategoryPieChart(products.byCategories);
      setIsProductsAnalyticsLoading(false);
    }
  }, [users, orders, products]);

  return (
    <Container maxWidth="xl">
      <Grid container paddingTop={3} rowGap={3} columnGap={2}>
        <Grid item xs={12}>
          <Grid container gap={3}>
            <Grid component={Card} item sm={12} md={5} lg={4} xl={3}>
              <CardContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                  {isUserAnalyticsLoading ? (
                    <>
                      <div style={{ width: '100%' }}>
                        <Skeleton width={'50%'}></Skeleton>
                        <Skeleton width={'25%'}></Skeleton>
                      </div>
                      <Skeleton variant="circular" width={100} height={70}></Skeleton>
                    </>
                  ) : (
                    <>
                      <div>
                        <Typography variant="body1" fontWeight={'bold'} color={'GrayText'}>
                          Total Users
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>
                          {users.count}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={'bold'} className={notifyUserChange ? 'notify-user-change' : ""} sx={{transition:"0.4s ease all"}}>
                          {loggedInUsers.length} Connected now!
                        </Typography>
                      </div>

                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: (theme) => theme.palette.secondaryButton.light.main
                        }}>
                        <UsersIcon fontSize={'large'}></UsersIcon>
                      </Avatar>
                    </>
                  )}
                </Box>
              </CardContent>
            </Grid>

            <Grid component={Card} item sm={12} md={5} lg={4} xl={3}>
              <CardContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                  {isUserAnalyticsLoading ? (
                    <>
                      <div style={{ width: '100%' }}>
                        <Skeleton width={'50%'}></Skeleton>
                        <Skeleton width={'25%'}></Skeleton>
                      </div>
                      <Skeleton variant="circular" width={100} height={70}></Skeleton>
                    </>
                  ) : (
                    <>
                      <div>
                        <Typography variant="body1" fontWeight={'bold'} color={'GrayText'}>
                          New users this month
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>
                          {newUsers}
                        </Typography>
                      </div>

                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: (theme) => theme.palette.secondaryButton.main
                        }}>
                        <GroupAdd fontSize={'large'}></GroupAdd>
                      </Avatar>
                    </>
                  )}
                </Box>
              </CardContent>
            </Grid>

            <Grid component={Card} item sm={12} md={5} lg={4} xl={3}>
              <CardContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                  {isOrdersAnalyticsLoading ? (
                    <>
                      <div style={{ width: '100%' }}>
                        <Skeleton width={'50%'}></Skeleton>
                        <Skeleton width={'25%'}></Skeleton>
                      </div>
                      <Skeleton variant="circular" width={100} height={70}></Skeleton>
                    </>
                  ) : (
                    <>
                      <div>
                        <Typography variant="body1" fontWeight={'bold'} color={'GrayText'}>
                          Monthly Profit
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>
                          {formatPrice(monthlyProfit)}
                        </Typography>
                      </div>

                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: '#2e7d32'
                        }}>
                        <ProfitIcon fontSize={'large'}></ProfitIcon>
                      </Avatar>
                    </>
                  )}
                </Box>
              </CardContent>
            </Grid>

            <Grid component={Card} item sm={12} md={5} lg={4} xl={3}>
              <CardContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                  {isOrdersAnalyticsLoading ? (
                    <>
                      <div style={{ width: '100%' }}>
                        <Skeleton width={'50%'}></Skeleton>
                        <Skeleton width={'25%'}></Skeleton>
                      </div>
                      <Skeleton variant="circular" width={100} height={70}></Skeleton>
                    </>
                  ) : (
                    <>
                      <div>
                        <Typography variant="body1" fontWeight={'bold'} color={'GrayText'}>
                          Total Orders
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>
                          {orders.count}
                        </Typography>
                      </div>

                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: (theme) => theme.palette.mainButton.main
                        }}>
                        <OrdersIcon fontSize={'large'}></OrdersIcon>
                      </Avatar>
                    </>
                  )}
                </Box>
              </CardContent>
            </Grid>
            <Grid component={Card} item sm={12} md={5} lg={4} xl={3}>
              <CardContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                  {isOrdersAnalyticsLoading ? (
                    <>
                      <div style={{ width: '100%' }}>
                        <Skeleton width={'50%'}></Skeleton>
                        <Skeleton width={'25%'}></Skeleton>
                      </div>
                      <Skeleton variant="circular" width={100} height={70}></Skeleton>
                    </>
                  ) : (
                    <>
                      <div>
                        <Typography variant="body1" fontWeight={'bold'} color={'GrayText'}>
                          Packed Orders
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>
                          {orders?.byStatus.filter((status) => status._id === 'Packed')[0]
                            ? orders?.byStatus.filter((status) => status._id === 'Packed')[0].count
                            : 0}
                        </Typography>
                      </div>

                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: (theme) => theme.palette.warning.light
                        }}>
                        <PackedIcon fontSize={'large'}></PackedIcon>
                      </Avatar>
                    </>
                  )}
                </Box>
              </CardContent>
            </Grid>
            <Grid component={Card} item sm={12} md={5} lg={4} xl={3}>
              <CardContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                  {isOrdersAnalyticsLoading ? (
                    <>
                      <div style={{ width: '100%' }}>
                        <Skeleton width={'50%'}></Skeleton>
                        <Skeleton width={'25%'}></Skeleton>
                      </div>
                      <Skeleton variant="circular" width={100} height={70}></Skeleton>
                    </>
                  ) : (
                    <>
                      <div>
                        <Typography variant="body1" fontWeight={'bold'} color={'GrayText'}>
                          Delivered Orders
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>
                          {orders?.byStatus.filter((status) => status._id === 'Delivered')[0]
                            ? orders?.byStatus.filter((status) => status._id === 'Delivered')[0]
                                .count
                            : 0}
                        </Typography>
                      </div>

                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: (theme) => theme.palette.success.main
                        }}>
                        <ShippedIcon fontSize={'large'}></ShippedIcon>
                      </Avatar>
                    </>
                  )}
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container gap={3}>
            <Grid item component={Card} sm={12} md={5} lg={4} xl={3}>
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" fontWeight={'bold'}>
                  Amount Of Products Per Category
                </Typography>

                <ResponsiveContainer width={200} aspect={1}>
                  <PieChart>
                    <Pie
                      data={productsCategoryPieChart}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="count">
                      {productsCategoryPieChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip></Tooltip>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Grid>
            <Grid item component={Card} sm={12} md={5} lg={4} xl={3}>
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                {isOrdersAnalyticsLoading ? (
                  <>
                    <div style={{ width: '100%' }}>
                      <Skeleton width={'50%'}></Skeleton>
                      <Skeleton width={'25%'}></Skeleton>
                    </div>
                    <Skeleton variant="circular" width={100} height={70}></Skeleton>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" fontWeight={'bold'}>
                      Orders By Status
                    </Typography>
                    <ResponsiveContainer width={200} aspect={1}>
                      <PieChart>
                        <Pie
                          data={orders.byStatus}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="count"
                          nameKey={'_id'}>
                          {productsCategoryPieChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip></Tooltip>
                      </PieChart>
                    </ResponsiveContainer>
                  </>
                )}
              </CardContent>
            </Grid>
            <Grid item component={Card} sm={12} md={5} lg={4} xl={3}>
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                {isUserAnalyticsLoading ? (
                  <></>
                ) : (
                  <>
                    <Typography variant="body2" fontWeight={'bold'}>
                      Users Status
                    </Typography>
                    <ResponsiveContainer width={200} aspect={1}>
                      <PieChart>
                        <Pie
                          data={users.usersState}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="count">
                          {productsCategoryPieChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip></Tooltip>
                      </PieChart>
                    </ResponsiveContainer>
                  </>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card></Card>
    </Container>
  );
};

export default DashboardAnalyticsOverview;
