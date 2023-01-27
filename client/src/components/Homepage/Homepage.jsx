import React, { useState, useEffect } from "react";
import "./Homepage.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Box, Toolbar, Pagination, CircularProgress } from "@mui/material";
import SideNavigation from "../SideNavigation/SideNavigation";
import { useSearchParams } from "react-router-dom";
import ProductCardList from "../ProductCardList/ProductCardList";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(searchParams.get("pageNumber")) || 1;
  });
  const [numOfPages, setNumOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productCategories, setProductCategories] = useState(null);
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const { getToken } = useAuth();

  const drawerWidth = 300;

  const handlePageChange = async (event, page) => {
    setCurrentPage(page);
    searchParams.set("pageNumber", page);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:2308/Category");
      setProductCategories(response.data.categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("pageNumber")) || 1);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:2308/Product?${searchParams.toString()}`
      );

      const { products, pages, priceRange } = response.data;
      setProducts(products);
      setNumOfPages(pages);
      setPriceRange(priceRange);
      setIsLoading(false);
    }
    fetchProducts();
  }, [searchParams]);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Toolbar></Toolbar>
      <Box display={"flex"}>
        <SideNavigation
          drawerWidth={drawerWidth}
          categories={productCategories}
          priceRange={priceRange}
        ></SideNavigation>
        {(() => {
          if (isLoading) {
            return <CircularProgress size={100} sx={{ margin: "auto" }} />;
          } else {
            return <ProductCardList products={products} />;
          }
        })()}
      </Box>
      {!isLoading && (
        <Pagination
          size="large"
          color="primary"
          sx={{ marginLeft: `${drawerWidth}px`, alignSelf: "center" }}
          count={numOfPages}
          page={currentPage}
          onChange={handlePageChange}
        ></Pagination>
      )}
    </Box>
  );
};

export default Homepage;
