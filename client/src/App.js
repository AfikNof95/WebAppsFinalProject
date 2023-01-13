import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./components/routing/MainRouter";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

// When login / changing password and so on (maybe even after parchuse)
// For single paging not having the option to get back and pay twice for the same
// - Effi said use the - useHistory.back or history = useHistory() --> history.replace('/')...

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
