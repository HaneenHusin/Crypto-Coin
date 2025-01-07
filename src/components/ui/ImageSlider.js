import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Box, Typography,Card } from "@mui/material";
import { Start } from "@mui/icons-material";

const ImageSlider = () => {
  const [coins, setCoins] = useState([]);

  
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "eur", 
              order: "market_cap_desc", 
              per_page: 10,
              page: 1, 
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchCoins();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "100%", padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Current Prices
      </Typography>
      <Slider {...settings}>
        {coins.map((coin, index) => (
          <Card key={index} sx={{  textAlign: "center", boxShadow: 3, maxWidth:"90%" }}>
            <img
              src={coin.image}
              alt={coin.name}
              style={{
                width: "100%",
                height: "350px", 
                objectFit: "cover", 
                borderRadius: "8px", 
              }}
            />
            <Typography
              variant="h6"
              sx={{ marginTop: 2, fontWeight: "bold", color: "#333"}}
            >
              {coin.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              Price: €{coin.current_price.toFixed(2)}
            </Typography>
          </Card>
        
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
