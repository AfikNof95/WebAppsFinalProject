import * as React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

const ProductCardList = React.memo(({ products }) => {
  return (
    <Grid container spacing={0} sx={{ minWidth: 0 }}>
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ))}
    </Grid>
  );
});

export default ProductCardList;
