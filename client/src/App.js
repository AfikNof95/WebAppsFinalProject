import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './components/Navbar/Layout'
import AuthPage from './pages/LoginPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              HomePage component
              {/* then change to  <Route exact path="/" element={<Home />} /> */}
            </Route>
            <Route path="/login"> <AuthPage/> </Route>
            <Route path="/user">User component</Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
