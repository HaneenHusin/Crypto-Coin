import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { COINGECKO_URL } from "../utils/constants";
import { axiosInstance } from "../utils/apiService";
import { API_BASE_URL } from "../utils/constants";

const WeeklyChange = () => {
  const [priceChange, setPriceChange] = useState({
    bitcoin: null,
    ethereum: null,
  });

  useEffect(() => {
    const fetchWeeklyChange = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/fetchWeeklyChange`);
            setPriceChange({
                bitcoin: response.data.bitcoin,
                ethereum: response.data.ethereum,
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
