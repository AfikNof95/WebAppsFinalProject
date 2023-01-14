import { Divider } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartProduct } from "../CartProduct/CartProduct";

const CartProductList = ({ props }) => {
  const { getCartProducts } = useShoppingCart();

  const products = getCartProducts();

  return products.map((productObject) => (
    <div key={productObject.product._id}>
      <CartProduct
        key={productObject.product._id}
        id={productObject.product._id}
        name={productObject.product.name}
        imageURL={productObject.product.images[0]}
        price={productObject.product.price}
        quantity={productObject.quantity}
      ></CartProduct>
      <Divider sx={{ marginTop: 2 }}></Divider>
    </div>
  ));
};

export default CartProductList;
