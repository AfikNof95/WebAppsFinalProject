import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from './components/Navbar/Layout'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" exact>
              HomePage component
              {/* then change to  <Route exact path="/" element={<Home />} /> */}
            </Route>
            <Route path="/auth">Auth component</Route>
            <Route path="/user">User component</Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
