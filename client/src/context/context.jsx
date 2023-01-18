import React, { useState } from "react";

const ShopContext = React.createContext({
  //   token: "",
  //   isLoggedin: false,
  //   login: (token) => {},
  //   logout: () => {},
  userCart: [],
  addProduct: (product) => {},
  removeProduct: (product) => {},
});

export const ShopContextProvider = (props) => {
  // const [token, setToken] = useState(null);
  const [userShoppingCart, setUserShoppingCart] = useState([]);
  //   const isUserLogged = !!token;

  //   const loginHandler = (token) => {
  //     setToken(token);
  //   };
  //   const logoutHandler = () => {
  //     setToken(null);
  //   };

  const onAddProduct = (product) => {
    setUserShoppingCart((prevState) => {
      const foundProduct = prevState.find((item) => item._id === product._id);

      return !!foundProduct
        ? prevState.map((item) =>
            item._id === product._id
              ? { ...foundProduct, qty: foundProduct.qty + 1 }
              : item
          )
        : [...prevState, { ...product, qty: 1 }];
    });
  };

  const onRemoveProduct = (product) => {
    setUserShoppingCart((prevState) => {
      const foundProduct = prevState.find((item) => item._id === product._id);

      return foundProduct.qty > 1
        ? prevState.map((item) =>
            item._id === product._id
              ? { ...foundProduct, qty: foundProduct.qty - 1 }
              : item
          )
        : prevState.filter((item) => item._id !== product._id);
    });
  };

  const contextValue = {
    // token: token,
    // isLoggedin: isUserLogged,
    // login: loginHandler,
    // logout: logoutHandler,
    userCart: userShoppingCart,
    addProduct: onAddProduct,
    removeProduct: onRemoveProduct,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
