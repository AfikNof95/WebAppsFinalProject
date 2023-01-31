import * as React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

const ProductCardList = React.memo(({ products,drawerWidth }) => {
  return (
    <Grid container spacing={0} width={`calc(100vw - ${drawerWidth+17}px)`}>
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ))}
    </Grid>
  );
});

export default ProductCardList;
