import React, { useState } from "react";
import axios from "axios";
import  CustomButton from "./ui/CustomButton";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  Typography
} from "@mui/material";
import { COINGECKO_URL } from "../utils/constants";
import { axiosInstance } from "../utils/apiService";
const PriceHistoryTable = () => {
  const [startDate, setStartDate] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPriceHistory = async () => {
    if (!startDate) {
      alert("Please select a start date!");
      return;
    }
    setLoading(true);
    try {
    
      const bitcoinResponse = await await axiosInstance.post(
        `coins/bitcoin/market_chart/range`,
        {
          params: {
            vs_currency: "eur",
            from: new Date(startDate).getTime() / 1000, 
            to: new Date().getTime() / 1000, 
          },
        }
      );

      console.error("waiting:", bitcoinResponse);
      const ethereumResponse = await await axiosInstance.post(
        `coins/ethereum/market_chart/range`,
        {
          params: {
            vs_currency: "eur",
            from: new Date(startDate).getTime() / 1000,
            to: new Date().getTime() / 1000,
          },
        }
      );

      // Combine Bitcoin and Ethereum data
      const combinedPrices = bitcoinResponse.data.prices.map((btcPrice, index) => ({
        date: new Date(btcPrice[0]).toLocaleDateString(),
        bitcoin: btcPrice[1].toFixed(2),
        ethereum: ethereumResponse.data.prices[index]
          ? ethereumResponse.data.prices[index][1].toFixed(2)
          : "N/A",
      }));

      setPrices(combinedPrices.slice(0, 20)); 
    } catch (error) {
      console.error("Error fetching price history:", error);
      alert("Failed to fetch price history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}  gutterBottom>
      Price History Table
      </Typography>
   
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
       
        <CustomButton   onClick={fetchPriceHistory}
          disabled={loading} > {loading ? "Loading..." : "Fetch Price History"}</CustomButton>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Bitcoin (EUR)</TableCell>
                <TableCell>Ethereum (EUR)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prices.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.bitcoin}</TableCell>
                  <TableCell>{row.ethereum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
    </Box>
  );
};

export default PriceHistoryTable;
