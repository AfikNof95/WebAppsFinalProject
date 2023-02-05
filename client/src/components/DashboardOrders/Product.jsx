import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Product({
  id,
  name,
  imageURL,
  quantity,
  price,
  maxQuantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveFromOrder
}) {
  const [showQuantityError, setShowQuantityError] = useState(false);

  useEffect(() => {
    if (quantity >= maxQuantity) {
      return setShowQuantityError(true);
    }
    setShowQuantityError(false);
  }, [quantity, maxQuantity]);

  return (
    <Box
      component={Card}
      position="relative"
      display={'flex'}
      flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={2}>
      <Box width={150} height={150}>
        <img
          height={'100%'}
          width={'100%'}
          style={{ objectFit: 'contain' }}
          src={imageURL}
          alt=""></img>
      </Box>
      <Box maxWidth={300}>
        <Typography
          component="div"
          variant="body1"
          fontWeight={'bold'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          noWrap>
          <Link
            to={`/product/${id}`}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}>
            {name}
          </Link>
        </Typography>
      </Box>
      <Box>
        <TextField
          variant="outlined"
          type="number"
          name="quantity-input"
          key="quantity"
          color="primary"
          InputProps={{
            startAdornment: (
              <IconButton
                sx={{ pointerEvents: 'all' }}
                onClick={() => handleDecreaseQuantity(id)}
                size="small">
                <MinusIcon fontSize="0.6em"></MinusIcon>
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                sx={{ pointerEvents: 'all' }}
                onClick={() => handleIncreaseQuantity(id)}
                size="small">
                <PlusIcon fontSize="0.6em"></PlusIcon>
              </IconButton>
            )
          }}
          sx={{ width: '120px', pointerEvents: 'none' }}
          inputProps={{ style: { textAlign: 'center' } }}
          value={quantity}
          size="small"
          error={showQuantityError}
          helperText={showQuantityError ? "You've added the entire stock!" : ''}></TextField>
      </Box>
      <Box>
        <Typography variant="body1" textAlign={'center'}>
          {formatPrice(price)}
        </Typography>
      </Box>
      <Box sx={{ position: { xs: 'absolute', sm: 'absolute', md: 'static' }, top: 0, right: 0 }}>
        <IconButton onClick={() => handleRemoveFromOrder(id)} color="error">
          <ClearIcon></ClearIcon>
        </IconButton>
      </Box>
    </Box>
  );
}
