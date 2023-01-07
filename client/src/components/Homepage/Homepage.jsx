import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Homepage.css";
import { Container } from "@mui/system";
import ProductCard from "../ProductCard/ProductCard";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="home-layout">
        <h1>Welcome To Our Store</h1>
        <Container>
          <ProductCard />
        </Container>
      </div>
    </>
  );
};

export default Homepage;
