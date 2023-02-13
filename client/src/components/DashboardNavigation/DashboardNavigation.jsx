import './DashboardNavigation.css';
import UsersIcon from '@mui/icons-material/Group';
import OrdersIcon from '@mui/icons-material/LocalShipping';
import ProductsIcon from '@mui/icons-material/Store';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize';
import DashboardDesktopNavigation from './Dashboard';
import DashboardMobileNavigation from './Mobile';

const DashboardNavigation = ({ handlePageClick, selectedPage }) => {
  const navigate = useNavigate();
  const [screenSize] = useScreenSize();
  const [drawerWidth, setDrawerWidth] = useState(() => {
    return screenSize === 'sm' || screenSize === 'xs' ? 80 : 300;
  });

  const pages = [
    {
      name: 'Users',
      icon: <UsersIcon></UsersIcon>,
      link: '/'
    },
    {
      name: 'Products',
      icon: <ProductsIcon></ProductsIcon>,
      link: '/products'
    },
    {
      name: 'Orders',
      icon: <OrdersIcon></OrdersIcon>,
      link: '/orders'
    },
    {
      type: 'Divider',
      name: 'Divider'
    },
    {
      type: 'Title',
      title: 'Analytics',
      name: 'Analytics'
    },
    {
      name: 'Overview',
      icon: <AnalyticsIcon></AnalyticsIcon>,
      link: '/overview'
    }
  ];

  const navigateToHomepage = () => {
    navigate({ pathname: '/' });
  };

  useEffect(() => {
    setDrawerWidth(() => {
      return screenSize === 'sm' || screenSize === 'xs' ? 80 : 300;
    });
  }, [screenSize]);

  if(screenSize)
  return screenSize === 'sm' || screenSize === "xs" ? (
    <DashboardMobileNavigation
      pageName={selectedPage}
      handlePageClick={handlePageClick}
      navigateToHomepage={navigateToHomepage}
      drawerWidth={drawerWidth}
      pages={pages}></DashboardMobileNavigation>
  ) : (
    <DashboardDesktopNavigation
      pageName={selectedPage}
      handlePageClick={handlePageClick}
      navigateToHomepage={navigateToHomepage}
      drawerWidth={drawerWidth}
      pages={pages}></DashboardDesktopNavigation>
  );
};

export default DashboardNavigation;
