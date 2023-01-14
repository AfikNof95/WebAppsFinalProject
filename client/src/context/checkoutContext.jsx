import React, { useState } from "react";

const CheckoutContext = React.createContext({
  userCart: [],
  userInfo: [],
  paymentInfo: [],
  handleFormChange: () => {},
});

export const CheckoutContextProvider = (props) => {
  //   const [cart, setCart] = useState([]);
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

  const [tmpCart, setTmpCart] = useState([
    {
      name: "Product 1",
      desc: "A nice thing",
      price: "$9.99",
    },
    {
      name: "Product 2",
      desc: "Another thing",
      price: "$3.45",
    },
    {
      name: "Product 3",
      desc: "Something else",
      price: "$6.51",
    },
    { name: "Shipping", desc: "", price: "Free" },
  ]);
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
  const [tmpPayment, setTmpPayment] = useState([
    {
      name: "omer kaplan",
      number: 5555111156149999,
      expire: "01/27",
      cvc: 111,
    },
  ]);

  const handleFormChange = async (event) => {
    setTmpUserInfo({
      ...tmpUserInfo,
      [event.target.name]: event.target.value,
    });
    console.log(tmpUserInfo);
  };

  const checkoutContextValue = {
    userCart: tmpCart,
    userInfo: tmpUserInfo,
    paymentInfo: tmpPayment,
    handleFormChange: handleFormChange,
  };

  return (
    <CheckoutContext.Provider value={checkoutContextValue}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
