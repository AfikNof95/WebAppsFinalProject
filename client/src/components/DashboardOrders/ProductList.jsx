import { Divider } from '@mui/material';
import { Product } from './Product';
import { useEffect, useMemo, useState } from 'react';

const ProductList = ({ products, handleProductsUpdate }) => {
  const originalProducts = useMemo(()=>[...products],[]);
  const [orderProducts, setOrderProducts] = useState(() => {
    return [...products];
  });

  const handleRemoveFromOrder = (productId) => {
    setOrderProducts((currentState) => {
      return [...currentState.filter((product) => product.product._id !== productId)];
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setOrderProducts((currentState) => {
      return currentState.map((product) => {
        if (product.product._id === productId) {
          if (product.product.quantity - product.quantity < 0  && product.quantity + 1 > getProductOriginalQuantity(productId)) {
            return { ...product, ...{ quantity: product.quantity } };
          }
          return { ...product, ...{ quantity: product.quantity + 1 } };
        }
        return product;
      });
    });
  };

  const handleDecreaseQuantity = (productId) => {
    setOrderProducts((currentState) => {
      const existingProduct = currentState.find((product) => product.product._id === productId);
      if (existingProduct && existingProduct.quantity - 1 === 0) {
        return currentState.filter((product) => product.product._id !== productId);
      }
      return currentState.map((product) => {
        if (product.product._id === productId) {
          return { ...product, ...{ quantity: product.quantity - 1 } };
        }
        return product;
      });
    });
  };

  const getProductOriginalQuantity = (productId) => {
    return originalProducts.filter((product) => product.product._id === productId)[0].quantity;
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
        originalQuantity={getProductOriginalQuantity(product.product._id)}
        maxQuantity={product.product.quantity +getProductOriginalQuantity(product.product._id)}
        handleRemoveFromOrder={handleRemoveFromOrder}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}></Product>
      <Divider></Divider>
    </div>
  ));
};

export default ProductList;
