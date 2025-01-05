import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { COINGECKO_URL } from "../utils/constants";

const CurrentPrice = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get( `${COINGECKO_URL}/v3/coins/markets`, {
        params: {
          vs_currency: "eur",
          ids: "bitcoin,ethereum",
        },
      })
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Current Prices
      </Typography>
      <Grid container spacing={2}>
        {coins.map((coin) => (
          <Grid item xs={12} md={6} key={coin.id}>
            <Card
              sx={{
                border: "1px solid transparent",
                borderTop: "4px solid #35af00",
                borderRight: "4px solid #35af00",
                borderRadius: "8px",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  <Box>
                    <Typography variant="h5">{coin.name}</Typography>
                    <Typography variant="body1">
                      Current Price:{" "}
                      {coin.current_price
                        ? `${coin.current_price} €`
                        : "Loading..."}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CurrentPrice;
