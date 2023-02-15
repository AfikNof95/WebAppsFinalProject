import { createContext, useContext, useEffect, useState } from 'react';
import { SideCart } from '../components/Sidecart/Sidecart';
import { formatPrice } from '../utils/formatPrice';
import backendAPI from '../api';
import { useAuth } from './AuthContext';
import useLocalStorage from '../hooks/useLocalStorage';
import useScreenSize from '../hooks/useScreenSize';

const ShoppingCartContext = createContext({
  openCart() {},
  closeCart() {},
  getCartQuantity() {},
  getCartProducts() {},
  getCartTotalPrice() {},
  getCartTotalPriceNumber() {},
  getProductQuantity(productId) {},
  addToCart(productObject) {},
  increaseProductQuantity(productId, count) {},
  decreaseProductQuantity(productId, count) {},
  updateProductQuantity(productId, count) {},
  removeFromCart(productId) {},
  userInfo: [],
  paymentInfo: [],
  handleFormChange: () => {},
  handlePaymentChange: () => {},
  deleteCart: () => {},
  removePaymentInfo: () => {},
  removeUserInfo: () => {},
  handleChosenAddress: () => {}
});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const { currentUser } = useAuth();
  const [screenSize] = useScreenSize();
  const [cartProducts, setCartProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isShoppingCartLoading, setIsShoppingCartLoading] = useState(true);
  const [localCart, setLocalCart, clearLocalCart] = useLocalStorage('user-local-cart', []);
  const [userInfo, setUserInfo] = useState({
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    zipCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => Number(product.quantity) + quantity,
    0
  );

  useEffect(() => {
    if (isOpen && screenSize === 'sm') {
      setIsOpen(false);
    }
  }, [screenSize]);

  useEffect(() => {
    if (!currentUser) {
      setCartProducts(localCart);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        setIsShoppingCartLoading(true);
        const response = await backendAPI.cart.get(currentUser.localId);

        const filteredLocalCart = localCart.filter((localProduct) => {
          for (let serverProduct of response.data.products) {
            if (serverProduct.product._id === localProduct.product._id) {
              return false;
            }
          }
          return true;
        });

        setCartProducts([...filteredLocalCart, ...response.data.products]);
        setIsShoppingCartLoading(false);
      } catch (ex) {
        console.error(ex.message);
      }
    };

    
      if (currentUser) {
        fetchUserCart();
        clearLocalCart();
      } else {
        setIsInitialLoad(true);
        setCartProducts(localCart);
      }
    
    
  }, [currentUser]);

  useEffect(() => {
    cartQuantity === 0 && isOpen && closeCart();
  }, [cartQuantity, isOpen]);

  useEffect(() => {
    const updateUserCart = async () => {
      setIsShoppingCartLoading(true);
      const response = await backendAPI.cart.update(currentUser.localId, cartProducts);
      // setIsInitialLoad(true);
      // setCartProducts([...response.data.products]);
      
    };

    if (!isInitialLoad) {
      if (currentUser) {
        updateUserCart();
      } else {
        setLocalCart(cartProducts);
      }
      setIsShoppingCartLoading(false);
    } else {
      setIsInitialLoad(false);
    }
  }, [cartProducts]);

  function getCartProducts() {
    return cartProducts;
  }

  function deleteCart() {
    setCartProducts([]);
  }

  function removePaymentInfo() {
    setPaymentInfo({
      cardName: '',
      cardNumber: null,
      expDate: '',
      cvv: null
    });
  }

  function removeUserInfo() {
    setUserInfo({
      fName: '',
      lName: '',
      street: '',
      houseNumber: null,
      city: '',
      zipCode: null,
      country: ''
    });
  }

  function getProductQuantity(productId) {
    return cartProducts.find((product) => (product._id === productId ? product.quantity : 0));
  }

  function addToCart(productObject) {
    let success = true;
    setCartProducts((currentProducts) => {
      if (!currentProducts.find((cartProduct) => cartProduct.product._id === productObject._id)) {
        if (productObject.quantity === 0) {
          success = false;
          return currentProducts;
        }
        return [...currentProducts, { product: productObject, quantity: 1 }];
      }

      return currentProducts.map((cartProduct) => {
        if (cartProduct.product._id === productObject._id) {
          return {
            product: productObject,
            quantity:
              cartProduct.quantity < productObject.quantity
                ? cartProduct.quantity + 1
                : productObject.quantity
          };
        }
        return cartProduct;
      });
    });

    return success;
  }

  function increaseProductQuantity(productId, count = 1) {
    setCartProducts((currentProducts) => {
      return currentProducts.map((cartProduct) => {
        if (cartProduct.product._id === productId) {
          const newCount = count === 1 ? cartProduct.quantity + 1 : count;
          if (newCount > cartProduct.product.quantity) {
            return {
              ...cartProduct,
              ...{ quantity: cartProduct.product.quantity }
            };
          }
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

      if (newCount <= 0) {
        return currentProducts.filter((cartProduct) => cartProduct.product._id !== productId);
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
        return currentProducts.filter((cartProduct) => cartProduct.product._id !== productId);
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
      return currentProducts.filter((cartProduct) => cartProduct.product._id !== productId);
    });
  }

  function openCart() {
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

  function getCartTotalPriceNumber() {
    return cartProducts.reduce(
      (all, current) => all + (current.quantity || 0) * (current.product.price || 0),
      0
    );
  }

  const handleFormChange = async (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
  };

  const handlePaymentChange = async (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleChosenAddress = (address) => {
    setUserInfo({
      ...userInfo,
      ...address
    });
  };

  function applyDiscount(discountCode) {}

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getCartQuantity,
        getCartProducts,
        getProductQuantity,
        getCartTotalPrice,
        getCartTotalPriceNumber,
        addToCart,
        removeFromCart,
        deleteCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        updateProductQuantity,
        userInfo: userInfo,
        paymentInfo: paymentInfo,
        handleFormChange: handleFormChange,
        handlePaymentChange: handlePaymentChange,
        removePaymentInfo,
        removeUserInfo,
        isShoppingCartLoading,
        handleChosenAddress
      }}>
      {children}
      <SideCart isCartOpen={isOpen}></SideCart>
    </ShoppingCartContext.Provider>
  );
}
