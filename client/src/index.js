import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ShopContextProvider } from "./context/context";
import { CheckoutContextProvider } from "./context/checkoutContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <Router>
      <AuthContextProvider>
        <ShoppingCartProvider>
          <ShopContextProvider>
            <CheckoutContextProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </LocalizationProvider>
            </CheckoutContextProvider>
          </ShopContextProvider>
        </ShoppingCartProvider>
      </AuthContextProvider>
    </Router>
  </CookiesProvider>
);
