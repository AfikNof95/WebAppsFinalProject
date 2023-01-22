import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CheckoutContextProvider } from "./context/checkoutContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContextProvider } from "./store/auth-context";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CheckoutContextProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthContextProvider>
    </LocalizationProvider>
  </CheckoutContextProvider>
);
