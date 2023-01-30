import './CartProduct.css'
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import PlusIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { formatPrice } from '../../utils/formatPrice'
import { Link } from 'react-router-dom'

export function CartProduct({ id, name, imageURL, quantity, price }) {
    const { removeFromCart, increaseProductQuantity, decreaseProductQuantity } =
        useShoppingCart()

    return (
        <Card sx={{ display: 'flex', padding: 2 }} elevation={1}>
            <CardMedia
                component={'img'}
                height="80px"
                width="80px"
                image={imageURL}
                sx={{ objectFit: 'contain', height: '80px', width: '80px' }}
            />
            <CardContent
                sx={{
                    flex: '1 0 auto',
                    alignItems: 'center',
                    alignContent: 'center',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    alignItems={'center'}
                    height={'100%'}
                >
                    <Grid>
                        <Typography
                            component="div"
                            variant="body1"
                            fontWeight={'bold'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            width={350}
                            noWrap
                        >
                            <Link
                                to={`/product/${id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                            >
                                {name}
                            </Link>
                        </Typography>
                    </Grid>

                    <Grid item>
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
                                        onClick={() =>
                                            decreaseProductQuantity(id)
                                        }
                                        size="small"
                                    >
                                        <MinusIcon fontSize="0.6em"></MinusIcon>
                                    </IconButton>
                                ),
                                endAdornment: (
                                    <IconButton
                                        sx={{ pointerEvents: 'all' }}
                                        onClick={() =>
                                            increaseProductQuantity(id)
                                        }
                                        size="small"
                                    >
                                        <PlusIcon fontSize="0.6em"></PlusIcon>
                                    </IconButton>
                                ),
                            }}
                            sx={{ width: '120px', pointerEvents: 'none' }}
                            inputProps={{ style: { textAlign: 'center' } }}
                            value={quantity}
                            size="small"
                        ></TextField>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1">
                            {formatPrice(price)}
                        </Typography>
                    </Grid>
                    <Grid item display="flex" justifyContent="end">
                        <IconButton onClick={() => removeFromCart(id)}>
                            <ClearIcon></ClearIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
