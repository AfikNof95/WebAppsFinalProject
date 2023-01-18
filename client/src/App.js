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
        {/* <Layout>
          <Switch>
            <Route path="/" exact>
              HomePage component
              {/* then change to  <Route exact path="/" element={<Home />} /> */}
            {/* </Route>
            <Route path="/login"> <AuthPage/> </Route>
            <Route path="/user">User component</Route> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          {/* </Switch>
        </Layout> } */}
        
      </Router>
    </div>
  );
};

export default App;
