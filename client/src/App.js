import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./components/routing/MainRouter";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <ShoppingCartProvider>
            <MainRouter />
          </ShoppingCartProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
};

export default App;
