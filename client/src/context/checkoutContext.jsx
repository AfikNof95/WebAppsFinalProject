import React, { useState } from "react";

const CheckoutContext = React.createContext({
  userCart: [],
  userInfo: [],
  paymentInfo: [],
  handleFormChange: () => {},
  handlePaymentChange: () => {},
  tmpProducts: [],
  tmpUserInfo: [],
  tmpPayment: [],
});

export const CheckoutContextProvider = (props) => {
  //   const [userInfo, setUserInfo] = useState([
  //     {
  //       fName: "",
  //       lName: "",
  //       street: "",
  //       address2: "",
  //       city: "",
  //       state: "",
  //       zip: null,
  //       country: "",
  //     },
  //   ]);
  //   const [paymentInfo, setPaymentInfo] = useState([
  //     {
  //       name: "",
  //       number: null,
  //       expire: "",
  //       cvc: null,
  //     },
  //   ]);

  const [tmpUserInfo, setTmpUserInfo] = useState({
    fName: "omer",
    lName: "kaplan",
    address1: "Arbel",
    address2: "",
    city: "reut",
    state: "Israel",
    zip: "7179902",
    country: "IL",
  });
  const [tmpPayment, setTmpPayment] = useState({
    cardName: "omer kaplan",
    cardNumber: "5555111156149999",
    expDate: "01/27",
    cvc: 111,
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
    setTmpUserInfo({
      ...tmpUserInfo,
      [event.target.name]: event.target.value,
    });
    console.log(tmpUserInfo);
  };

  const handlePaymentChange = async (event) => {
    setTmpPayment({
      ...tmpPayment,
      [event.target.name]: event.target.value,
    });
    console.log(tmpPayment);
  };

  const checkoutContextValue = {
    userInfo: tmpUserInfo,
    paymentInfo: tmpPayment,
    handleFormChange: handleFormChange,
    handlePaymentChange: handlePaymentChange,
    tmpProducts: tmpProducts,
    tmpUserInfo: tmpUserInfo,
    tmpPayment: tmpPayment,
  };

  return (
    <CheckoutContext.Provider value={checkoutContextValue}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
