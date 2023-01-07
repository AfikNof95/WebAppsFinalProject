import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Navbar/Layout";
import Homepage from "./components/Homepage/Homepage";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <Layout> */}
          <Routes>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/auth">Auth component</Route>
            <Route path="/user">User component</Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        {/* </Layout> */}
      </Router>
    </div>
  );
};

export default App;
