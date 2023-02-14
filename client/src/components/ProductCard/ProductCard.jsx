import * as React from 'react';
import './ProductCard.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, List, ListItem, Tooltip } from '@mui/material';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = React.useState(false);
  const { addToCart, openCart } = useShoppingCart();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`, {
      state: {
        productId
      }
    });
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card variant="outlined" sx={{ padding: '1em', borderRadius: 0 }}>
        <CardMedia
          component="img"
          loading="lazy"
          onClick={() => handleProductClick(product._id)}
          height="150px"
          image={product.images[0]}
          alt={product.Title}
          sx={{
            cursor: 'pointer',
            objectFit: 'contain'
          }}
        />

        <CardContent sx={{ textOverflow: 'ellipsis' }}>
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={'bold'}
            textAlign="start"
            textOverflow={'ellipsis'}
            noWrap
            sx={{ wordBreak: 'break-word', cursor: 'pointer' }}
            onClick={() => handleProductClick(product._id)}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={'bold'} textAlign="start">
            {formatPrice(product.price)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {product.quantity > 0 && <Tooltip title="Add to cart">
            <IconButton
              aria-label="add to cart"
              onClick={() => {
                const response = addToCart(product);
                response && openCart();
              }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
}
          {product.quantity <= 0 && (
            <Box display={'flex'} justifyContent="center" width="100%" marginLeft={5}>
              <Typography color={'error'} variant="body1" fontWeight={'bold'}>
                Out Of Stock!
              </Typography>
            </Box>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ padding: 0 }}>
            <Typography
              onClick={() => handleProductClick(product._id)}
              variant="caption"
              color="text.secondary"
              textAlign={'start'}
              className="product-description product-link"
              sx={{ cursor: 'pointer' }}>
              {product.name}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default ProductCard;
