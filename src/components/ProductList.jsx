import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/slices/productSlices";
import Product from "./Product";
import { Grid, Container } from "@mui/material";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {products &&
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ProductList;
