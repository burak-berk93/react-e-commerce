import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  IconButton,
  Box,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlices";
import { addToBasket, calculateBasket } from "../redux/slices/basketSlice";

function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((store) => store.product);
  const { image, price, description, title } = selectedProduct;
  const [count, setCount] = useState(1);
  const [openAlert, setOpenAlert] = useState(false)
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const burak = useSelector((state) => state.basket.products); // Redux'tan veriyi çekiyoruz


  const addBasket =()=>{
    const payload ={
        id,
        price,
        image,
        title,
        description,
        count
    }
    dispatch(addToBasket(payload))
    dispatch(calculateBasket())
    setOpenAlert(true); // Sepet başarıyla eklendiğinde alert göster
    setTimeout(() => setOpenAlert(false), 3000); // 3 saniye sonra alert'i kapat
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = () => {
    products &&
      products.map((product) => {
        if (product.id == id) {
          dispatch(setSelectedProduct(product));
        }
      });
  };

  return (

    <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <div>
      {openAlert  && (
          <Alert
            severity="success"
            sx={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              width: "auto",
              zIndex: 10,
            }}
          >
            🛒 Ürün sepete eklendi!
          </Alert>
        )}

</div>
      <Card sx={{ maxWidth: 500, borderRadius: 4, boxShadow: 3, p: 2 }}>
      {burak.map((product) => (
  <div key={product.id}>{product.price}</div>
))}
{burak.length} 
        {/* Ürün Resmi */}
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
          sx={{ objectFit: "contain", borderRadius: 2 }}
        />

        {/* Ürün İçeriği */}
        <CardContent>
          {/* Ürün Başlığı */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {title}
          </Typography>

          {/* Ürün Açıklaması */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>

          {/* Ürün Fiyatı */}
          <Typography variant="h6" sx={{ color: "green", mb: 2 }}>
            {price} TL
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
            <IconButton onClick={decrement} color="primary">
              <Remove />
            </IconButton>

            <Typography variant="h6">{count}</Typography>

            <IconButton onClick={increment} color="primary">
              <Add />
            </IconButton>
          </Box>
          {/* Satın Al Butonu */}
          <Button onClick={addBasket} variant="contained" color="primary" fullWidth>
            Sepete Ekle
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails;
