import './SideNavigation.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MobileSideNavigation from './Mobile';
import DesktopSideNavigation from './Desktop';
import SideNavigationIcons from './SideNavigationIcons';

const SideNavigation = ({
  screenSize,
  categories = [],
  productsGroupByCategories = [],
  priceRange,
  drawerWidth
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deviceType, setDeviceType] = useState(() => {
    return screenSize === 'sm' || screenSize === 'xs' ? 'mobile' : 'desktop';
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    return searchParams.get('categoryId');
  });

  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    if (selectedCategoryId !== categoryId) {
      return setSelectedCategoryId(categoryId);
    }
  }, [searchParams]);

  useEffect(() => {
    setDeviceType(() => {
      return screenSize === 'sm' || screenSize === 'xs' ? 'mobile' : 'desktop';
    });
  }, [screenSize]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const resetCategory = () => {
    setSelectedCategoryId(null);
  };

  const pages = [
    {
      name: 'Homepage',
      icon: SideNavigationIcons.Homepage,
      link: '/'
    },
    {
      name: 'Categories',
      icon: SideNavigationIcons.Categories,
      link: '/categories'
    },
    {
      name: 'About',
      icon: SideNavigationIcons.Info,
      link: '/about'
    }
  ];

  return (
    <>
      {deviceType === 'mobile' ? (
        <MobileSideNavigation
          drawerWidth={drawerWidth}
          deviceType={deviceType}
          categories={categories}
          handleCategoryClick={handleCategoryClick}
          resetCategory={resetCategory}
          selectedCategoryId={selectedCategoryId}
          priceRange={priceRange}></MobileSideNavigation>
      ) : (
        <DesktopSideNavigation
          deviceType={deviceType}
          drawerWidth={drawerWidth}
          pages={pages}
          categories={categories}
          productsGroupByCategories={productsGroupByCategories}
          handleCategoryClick={handleCategoryClick}
          resetCategory={resetCategory}
          selectedCategoryId={selectedCategoryId}
          priceRange={priceRange}></DesktopSideNavigation>
      )}
    </>
  );
};

export default SideNavigation;
