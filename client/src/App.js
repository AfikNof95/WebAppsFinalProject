import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./components/routing/MainRouter";

const App = () => {
  return (
    <div className="App">
      <Router>
        <MainRouter />
      </Router>
    </div>
  );
};

export default App;
