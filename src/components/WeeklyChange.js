import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { COINGECKO_URL } from "../utils/constants";
import { axiosInstance } from "../utils/apiService";

const WeeklyChange = () => {
  const [priceChange, setPriceChange] = useState({
    bitcoin: null,
    ethereum: null,
  });

  useEffect(() => {
    const fetchWeeklyChange = async () => {
      try {
        const bitcoinResponse = await axiosInstance.get(
          `simple/price?ids=bitcoin,ethereum&vs_currencies=eur`,
        
        );
        // const ethereumResponse = await axiosInstance.get(
        //   `simple/price?ids=ethereum&vs_currencies=eur`,
          
          
        // );

        const bitcoinCurrentPrice = bitcoinResponse.data.bitcoin.eur;
        const ethereumCurrentPrice = bitcoinResponse.data.ethereum.eur;

        const bitcoinHistoryResponse = await axiosInstance.get(
          `coins/bitcoin/market_chart`,
          {
           
            params: {
              vs_currency: "eur",
              days: 7,
           
            },
          }
        );
        const ethereumHistoryResponse = await axiosInstance.get(
          `coins/ethereum/market_chart`,
          {
           
            params: {
              vs_currency: "eur",
              days: 7,
            
            },
          }
        );

        const bitcoinOldPrice = bitcoinHistoryResponse.data.prices[0][1];
        const ethereumOldPrice = ethereumHistoryResponse.data.prices[0][1];

        const bitcoinChange =
          ((bitcoinCurrentPrice - bitcoinOldPrice) / bitcoinOldPrice) * 100;
        const ethereumChange =
          ((ethereumCurrentPrice - ethereumOldPrice) / ethereumOldPrice) * 100;

        setPriceChange({
          bitcoin: bitcoinChange.toFixed(2),
          ethereum: ethereumChange.toFixed(2),
        });
      } catch (error) {
        console.error("Error fetching weekly change data:", error);
      }
    };

    fetchWeeklyChange();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Change in One Week
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Bitcoin Weekly Change</Typography>
              <Typography variant="body1" color="primary">
                {priceChange.bitcoin ? `${priceChange.bitcoin}%` : "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Ethereum Weekly Change</Typography>
              <Typography variant="body1" color="primary">
                {priceChange.ethereum
                  ? `${priceChange.ethereum}%`
                  : "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeeklyChange;
