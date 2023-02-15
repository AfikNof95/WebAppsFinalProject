import React, { useState, useEffect } from 'react';
import './Homepage.css';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Box, Toolbar, Pagination, CircularProgress } from '@mui/material';
import SideNavigation from '../SideNavigation/SideNavigation';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCardList from '../ProductCardList/ProductCardList';
import backendAPI from '../../api';
import useScreenSize from '../../hooks/useScreenSize';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(searchParams.get('pageNumber')) || 1;
  });
  const [numOfPages, setNumOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productCategories, setProductCategories] = useState(null);
  const [productsGroupByCategories, setProductsGroupByCategories] = useState(null);
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [screenSize] = useScreenSize();
  const [drawerWidth, setDrawerWidth] = useState(() => {
    return screenSize === 'sm' || screenSize === 'xs' ? 80 : 300;
  });

  useEffect(() => {
    setDrawerWidth(() => {
      return screenSize === 'sm' || screenSize === 'xs' ? 80 : 300;
    });
  }, [screenSize]);

  const handlePageChange = async (event, page) => {
    setCurrentPage(page);
    searchParams.set('pageNumber', page);
    setSearchParams(searchParams, { replace: false });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:2308/Category');
      setProductCategories(response.data.categories);
    };
    const fetchProductsGroupByCategories = async () => {
      const response = await backendAPI.product.getGroupByCategories();
      setProductsGroupByCategories(response.data);
    };
    fetchCategories();
    fetchProductsGroupByCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('pageNumber')) || 1);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:2308/Product?${searchParams.toString()}`);

      const { products, pages, priceRange } = response.data;
      setProducts(products);
      setNumOfPages(pages);
      setPriceRange(priceRange);
      setIsLoading(false);
    }
    fetchProducts();
  }, [searchParams]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{ backgroundColor: 'white' }}
      height={'calc(100vh)'}>
      <Toolbar></Toolbar>
      <Box display={'flex'}>
        <SideNavigation
          drawerWidth={drawerWidth}
          screenSize={screenSize}
          categories={productCategories}
          productsGroupByCategories={productsGroupByCategories}
          priceRange={priceRange}></SideNavigation>
        {(() => {
          if (isLoading) {
            return (
              <Box
                display={'flex'}
                width={'100vw'}
                height={'calc(100vh - 64px)'}
                alignItems={'center'}
                justifyContent={'center'}>
                <CircularProgress size={100} />
              </Box>
            );
          } else {
            return <ProductCardList products={products} drawerWidth={drawerWidth} />;
          }
        })()}
      </Box>
      {!isLoading && (
        <Pagination
          size="large"
          color="primary"
          sx={{
            marginLeft: `${drawerWidth}px`,
            alignSelf: 'center',
            marginTop: 'auto'
          }}
          count={numOfPages}
          page={currentPage}
          onChange={handlePageChange}></Pagination>
      )}
    </Box>
  );
};

export default Homepage;
