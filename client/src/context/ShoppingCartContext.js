import { createContext, useContext, useEffect, useState } from "react";
import { SideCart } from "../components/Sidecart/Sidecart";
import { formatPrice } from "../utils/formatPrice";

const ShoppingCartContext = createContext({
  openCart() {},
  closeCart() {},
  getCartQuantity() {},
  getCartProducts() {},
  getCartTotalPrice() {},
  getProductQuantity(productId) {},
  addToCart(productObject) {},
  increaseProductQuantity(productId, count) {},
  decreaseProductQuantity(productId, count) {},
  updateProductQuantity(productId, count) {},
  removeFromCart(productId) {},
});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => Number(product.quantity) + quantity,
    0
  );

  useEffect(() => {
    if (cartQuantity === 0 && isOpen) {
      closeCart();
    }
    return;
  }, [cartQuantity, isOpen]);

  function getCartProducts() {
    return cartProducts;
  }

  function getProductQuantity(productId) {
    return cartProducts.find((product) =>
      product._id === productId ? product.quantity : 0
    );
  }

  function addToCart(productObject) {
    setCartProducts((currentProducts) => {
      if (
        !currentProducts.find(
          (cartProduct) => cartProduct.product._id === productObject._id
        )
      ) {
        return [...currentProducts, { product: productObject, quantity: 1 }];
      }

      return currentProducts.map((cartProduct) => {
        if (cartProduct.product._id === productObject._id) {
          return {
            product: productObject,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      });
    });
    openCart();
  }

  function increaseProductQuantity(productId, count = 1) {
    setCartProducts((currentProducts) => {
      return currentProducts.map((cartProduct) => {
        if (cartProduct.product._id === productId) {
          const newCount = count === 1 ? cartProduct.quantity + 1 : count;
          return { product: cartProduct.product, quantity: newCount };
        }
        return cartProduct;
      });
    });
  }

  function decreaseProductQuantity(productId, count = 1) {
    setCartProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (cartProduct) => cartProduct.product._id === productId
      );
      const newCount = count === 1 ? existingProduct.quantity - 1 : count;

      if (newCount === 0) {
        return currentProducts.filter(
          (cartProduct) => cartProduct.product._id !== productId
        );
      }
      return currentProducts.map((cartProduct) => {
        if (cartProduct.product._id === productId) {
          return { product: cartProduct.product, quantity: newCount };
        }
        return cartProduct;
      });
    });
  }

  function updateProductQuantity(productId, count) {
    setCartProducts((currentProducts) => {
      let newCount = count;

      if (count < 0) {
        newCount = 1;
      }

      if (count === 0) {
        return currentProducts.filter(
          (cartProduct) => cartProduct.product._id !== productId
        );
      }
      return currentProducts.map((cartProduct) => {
        if (cartProduct.product._id === productId) {
          return { product: cartProduct.product, quantity: newCount };
        }
        return cartProduct;
      });
    });
  }

  function removeFromCart(productId) {
    setCartProducts((currentProducts) => {
      return currentProducts.filter(
        (cartProduct) => cartProduct.product._id !== productId
      );
    });
  }

  function openCart() {
    if (cartQuantity === 0) {
      return;
    }
    setIsOpen(true);
  }
  function closeCart() {
    setIsOpen(false);
  }
  function getCartQuantity() {
    return cartQuantity;
  }

  function getCartTotalPrice() {
    let sum = 0;
    for (let product of cartProducts) {
      sum += product.quantity * product.product.price;
    }
    return formatPrice(sum);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getCartQuantity,
        getCartProducts,
        getProductQuantity,
        getCartTotalPrice,
        addToCart,
        removeFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        updateProductQuantity,
      }}
    >
      {children}
      <SideCart isCartOpen={isOpen}></SideCart>
    </ShoppingCartContext.Provider>
  );
}
