import React, { useState } from "react";
import CartSection from "./CartSection";
import PaymentSection from "./PaymentSection";
import { useContext } from "react";
import ShopContext from "../../context/context";
import "./Checkout.css";

function Checkout() {
  const [showPayment, setShowPayment] = useState(false);
  const context = useContext(ShopContext);
  
  return (
    <div id="cart-page-layout" className="container mt-1">
      <CartSection props={null} />
      {showPayment && <PaymentSection />}
      {/* {context.userCart.length > 0 && <PaymentSection />} */}
    </div>
  );
}

export default Checkout;
