import { useShoppingCart } from '../../context/ShoppingCartContext'
import { ReviewProduct } from './ReviewProduct'

const ReviewProdList = () => {
    const { getCartProducts } = useShoppingCart()
    const products = getCartProducts()

    return products.map((productObject) => (
        <ReviewProduct
            key={productObject.product._id}
            id={productObject.product._id}
            name={productObject.product.name}
            imageURL={productObject.product.images[0]}
            price={productObject.product.price}
            quantity={productObject.quantity}
        ></ReviewProduct>
    ))
}

export default ReviewProdList
