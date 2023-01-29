import { Divider } from '@mui/material'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { SideCartProduct } from '../SideCartProduct/SideCartProduct'

const SideCartProductList = ({ props }) => {
    const { getCartProducts } = useShoppingCart()

    const products = getCartProducts()

    return products.map((productObject) => (
        <div key={productObject.product._id}>
            <SideCartProduct
                key={productObject.product._id}
                id={productObject.product._id}
                name={productObject.product.name}
                imageURL={productObject.product.images[0]}
                price={productObject.product.price}
                quantity={productObject.quantity}
                maxQuantity={productObject.product.quantity}
            ></SideCartProduct>
            <Divider sx={{ marginTop: 2 }}></Divider>
        </div>
    ))
}

export default SideCartProductList
