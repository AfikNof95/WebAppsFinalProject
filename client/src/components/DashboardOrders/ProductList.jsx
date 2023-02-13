import { Divider } from '@mui/material';
import { Product } from './Product';
import { useEffect, useState } from 'react';

const ProductList = ({ products, handleProductsUpdate }) => {
  const [orderProducts, setOrderProducts] = useState(() => {
    return [...products];
  });

  const handleRemoveFromOrder = (productId) => {
    setOrderProducts((currentState) => {
      return currentState.filter((product) => product.product._id !== productId);
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setOrderProducts((currentState) => {
      return currentState.map((product) => {
        if (product.product._id === productId) {
          return { ...product, ...{ quantity: product.quantity + 1 } };
        }
        return product;
      });
    });
  };

  const handleDecreaseQuantity = (productId) => {
    setOrderProducts((currentState) => {
      return currentState.map((product) => {
        if (product.product._id === productId) {
          if (product.quantity - 1 <= 0) {
            return null;
          }
          return { ...product, ...{ quantity: product.quantity - 1 } };
        }
        return product;
      });
    });
  };

  useEffect(() => {
    if (JSON.stringify(orderProducts) !== JSON.stringify(products)) {
      handleProductsUpdate(orderProducts);
    }
  }, [orderProducts]);

  return orderProducts.map((product) => (
    <div key={product.product._id}>
      <Product
        key={product.product._id}
        id={product.product._id}
        name={product.product.name}
        imageURL={product.product.images[0]}
        price={product.product.price}
        quantity={product.quantity}
        maxQuantity={product.product.quantity}
        handleRemoveFromOrder={handleRemoveFromOrder}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}></Product>
      <Divider></Divider>
    </div>
  ));
};

export default ProductList;
