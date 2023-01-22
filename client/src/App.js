import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./components/routing/MainRouter";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

const App = () => {
  return (
    <div className="App">
      <Router>
        <ShoppingCartProvider>
          <MainRouter />
        </ShoppingCartProvider>
      </Router>
    </div>
  );
};

export default App;
