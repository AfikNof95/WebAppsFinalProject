import "./App.css";
import React from "react";

import MainRouter from "./components/routing/MainRouter";
import { useAxiosIntercept } from "./hooks/useAxiosIntercept";

const App = () => {
  useAxiosIntercept();
  return (
    <div className="App">
      <MainRouter />
    </div>
  );
};

export default App;
