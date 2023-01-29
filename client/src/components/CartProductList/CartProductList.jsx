import { Divider } from '@mui/material'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { CartProduct } from '../CartProduct/CartProduct'

const CartProductList = () => {
    const { getCartProducts } = useShoppingCart()

    const products = getCartProducts()

    return products.map((productObject) => (
        <>
            <CartProduct
                key={productObject.product._id}
                id={productObject.product._id}
                name={productObject.product.name}
                imageURL={productObject.product.images[0]}
                price={productObject.product.price}
                quantity={productObject.quantity}
                maxQuantity={productObject.product.quantity}
            ></CartProduct>
            <Divider></Divider>
        </>
    ))
}

export default CartProductList
