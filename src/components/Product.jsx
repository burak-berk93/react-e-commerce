import React, { useState }  from "react";
import { Card, CardMedia, CardContent, Typography, Button,  } from "@mui/material";

import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const { id, image, price, description, title} = product;

  const navigate = useNavigate()
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 4, boxShadow: 3, m: 2 }}>
      {/* Ürün Resmi */}
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={title}
        sx={{ objectFit: "contain", padding: 2 }}
      />

      {/* Ürün İçeriği */}
      <CardContent>
        {/* Ürün Başlığı */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        {/* Ürün Açıklaması */}
        <Typography variant="body2" color="text.secondary" sx={{ height: 50, overflow: "hidden" }}>
          {description}
        </Typography>

        {/* Fiyat ve Buton */}
        <Typography variant="h6" sx={{ mt: 2, color: "green" }}>
          {price} TL
        </Typography>

 
        <Button onClick={()=> navigate("/product-details/"+id)} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Detaylar
        </Button>
      </CardContent>
    </Card>
  );
}

export default Product;
