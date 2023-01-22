import React, { useState } from "react";

const CheckoutContext = React.createContext({
  userCart: [],
  userInfo: [],
  paymentInfo: [],
  handleFormChange: () => {},
  handlePaymentChange: () => {},
  tmpProducts: [],
  // tmpUserInfo: [],
  // tmpPayment: [],
});

export const CheckoutContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    fName: "",
    lName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const tmpProducts = [
    {
      name: "Product 1",
      desc: "A nice thing",
      price: "$9.99",
    },
    {
      name: "Product 3",
      desc: "Something else",
      price: "$6.51",
    },
    { name: "Shipping", desc: "", price: "Free" },
  ];

  const handleFormChange = async (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handlePaymentChange = async (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value,
    });
  };

  const checkoutContextValue = {
    userInfo: userInfo,
    paymentInfo: paymentInfo,
    handleFormChange: handleFormChange,
    handlePaymentChange: handlePaymentChange,
    tmpProducts: tmpProducts,
    // tmpUserInfo: tmpUserInfo,
    // tmpPayment: tmpPayment,
  };

  return (
    <CheckoutContext.Provider value={checkoutContextValue}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
