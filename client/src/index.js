import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ShopContext from "./context/context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShopContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ShopContext>
);
