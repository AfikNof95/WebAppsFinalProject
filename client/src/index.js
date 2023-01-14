import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShopContextProvider } from "./context/context";
import { CheckoutContextProvider } from './context/checkoutContext';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShopContextProvider>
    <CheckoutContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CheckoutContextProvider>
  </ShopContextProvider>
);
