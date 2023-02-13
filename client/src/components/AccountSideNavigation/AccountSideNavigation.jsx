import './SideNavigation.css';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MobileSideNavigation from './Mobile';
import DesktopSideNavigation from './Desktop';
import SideNavigationIcons from './SideNavigationIcons';
import useScreenSize from '../../hooks/useScreenSize';

const AccountSideNavigation = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const locationState = useLocation();
  const [screenSize, setScreenSize] = useScreenSize();
  const [deviceType, setDeviceType] = useState(() => {
    return screenSize === 'sm' || screenSize === 'xs' ? 'mobile' : 'desktop';
  });
  const [selectedPage, setSelectedPage] = useState(() => {
    return locationState.state && locationState.state.pageName
      ? locationState.state.pageName
      : 'Personal Details';
  });

  useEffect(() => {
    setDeviceType(() => {
      return screenSize === 'sm' || screenSize === 'xs' ? 'mobile' : 'desktop';
    });
  }, [screenSize]);

  const handlePageClick = (pageName) => {
    if (selectedPage !== pageName) {
      setSelectedPage(pageName);
      navigate('/account', { state: { pageName } });
    }
  };

  useEffect(() => {
    if (locationState.state && locationState.state.pageName) {
      setSelectedPage(locationState.state.pageName);
    }
  }, [locationState]);

  const pages = [
    {
      name: 'Personal Details',
      icon: SideNavigationIcons.personalDetails,
      link: '/'
    },
    {
      name: 'Orders History',
      icon: SideNavigationIcons.ordersHistory,
      link: '/about'
    }
  ];

  return (
    <>
      {deviceType === 'mobile' ? (
        <MobileSideNavigation
          pages={pages}
          pageName={selectedPage}
          drawerWidth={drawerWidth}
          deviceType={deviceType}
          handlePageClick={handlePageClick}></MobileSideNavigation>
      ) : (
        <DesktopSideNavigation
          pageName={selectedPage}
          deviceType={deviceType}
          drawerWidth={drawerWidth}
          pages={pages}
          handlePageClick={handlePageClick}></DesktopSideNavigation>
      )}
    </>
  );
};

export default AccountSideNavigation;
