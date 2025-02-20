import { useEffect, useState } from "react";
  import {  useDispatch, useSelector } from "react-redux";
  import { Drawer, Typography, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";

import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";

import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import { drawerList, calculateBasket, removeFromBasket } from "./redux/slices/basketSlice";

function App() {
  const burak = useSelector((state) => state.basket.products); // Redux'tan veriyi çekiyoruz
  const drawer = useSelector((state) => state.basket.drawerState); // Redux'tan veriyi çekiyoruz
  const total = useSelector((state) => state.basket.totalAmount); // Redux'tan veriyi çekiyoruz
  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(calculateBasket())
},[])

  const handleRemove = (id) => {
    dispatch(removeFromBasket({ id })); // Redux action'ını dispatch et
  };

  return (
    <>
      <PageContainer>
        <Loading />


        <Drawer open={drawer} anchor="right" onClose={() => dispatch(drawerList())}>
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          🛒 Sepetiniz
        </Typography>

        <List>
          {burak.length > 0 ? (
            burak.map((product) => (
              <Box key={product.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="rounded" src={product.image} sx={{ width: 56, height: 56 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.title}
                    secondary={
                      <>
                    
                        <br />
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.main" }}>
                          {product.count} x {product.price} ₺
                        </Typography>
                      </>
                    }
                  />
                  <IconButton edge="end" onClick={() => handleRemove(product.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItem>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", mt: 3, color: "gray" }}>Sepetiniz boş</Typography>
          )}
        </List>

        {/* Toplam Fiyat */}
        {burak.length > 0 && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Toplam: {total} ₺
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>

        <Header />
        <RouterConfig />
      </PageContainer>
    </>
  );
}

export default App;
