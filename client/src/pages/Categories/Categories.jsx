import './Categories.css';
import { Grid, Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import SideNavigationIcons from '../../components/SideNavigation/SideNavigationIcons';
import { useNavigate } from 'react-router-dom';

const CategoriesPage = (props) => {
  const [productCategories, setProductCategories] = useState([]);
  const navigate = useNavigate();
  const images = useMemo(() => ({
    'Computers & Tablets': SideNavigationIcons.Computers,
    Kitchen: SideNavigationIcons.Kitchen,
    Headphones: SideNavigationIcons.Headphones,
    Shoes: SideNavigationIcons.Shoes,
    Watches: SideNavigationIcons.Watches,
    AllProducts: SideNavigationIcons.AllProducts
  }));

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:2308/Category');
      setProductCategories(response.data.categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (!categoryId) {
      navigate('/');
    } else {
      navigate(`/?categoryId=${categoryId}`);
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} height={'calc(100vh - 64px)'} padding={4}>
      <Toolbar></Toolbar>
      <Grid container height={'100%'} spacing={3} columnSpacing={3} columns={9} alignItems="center">
        <Grid item xs={12} md={12} lg={3}>
          <Paper
            onClick={() => handleCategoryClick()}
            elevation={2}
            sx={{
              height: { lg: 400, md: 300, sm: 300, xs: 200 },
              width: { xs: '50%', sm: '50%', md: '50%', lg: '100%' },
              margin: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto' },
              maxWidth: 600,
              maxHeight: 500,
              minHeight: 150,
              position: 'relative',
              cursor: 'pointer',
              background: '#24344c',
              transition: 'ease 0.5s all',
              '&:hover': {
                boxShadow: 5,
                backgroundColor: (theme) => theme.palette.secondaryButton.main
              }
            }}
            className="category-card">
            <Box
              display="flex"
              justifyContent={'center'}
              alignItems={'center'}
              height={'100%'}
              color="white">
              <Box textAlign={'center'}>
                {images.AllProducts}
                <Typography variant="h5" color="white" fontWeight={'bold'}>
                  Browse All Products
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        {productCategories.map((category) => (
          <Grid item xs={12} md={12} lg={3} key={category._id}>
            <Paper
              onClick={() => handleCategoryClick(category._id)}
              elevation={2}
              sx={{
                height: { lg: 400, md: 300, sm: 300, xs: 200 },
                width: { xs: '50%', sm: '50%', md: '50%', lg: '100%' },
                margin: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto' },
                maxWidth: 600,
                maxHeight: 500,
                minHeight: 150,
                position: 'relative',
                cursor: 'pointer',
                background: '#24344c',
                transition: 'ease 0.5s all',
                '&:hover': {
                  boxShadow: 5,
                  backgroundColor: (theme) => theme.palette.secondaryButton.main
                }
              }}
              className={'category-card'}>
              <Box
                display="flex"
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}
                color="white">
                <Box textAlign={'center'}>
                  {images[category.name]}
                  <Typography variant="h5" color="white" fontWeight={'bold'}>
                    Shop {category.name}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
