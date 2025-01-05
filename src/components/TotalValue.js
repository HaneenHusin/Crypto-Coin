import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";

const TotalValue = () => {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchTotalValue = async () => {
      try {
        console.log('Fetching total value...');
        const response = await axios.get("http://localhost:3000/api/portfolio/total-value");
        console.log('Total Value Response:', response.data);
        setTotalValue(response.data.totalValue);
      } catch (error) {
        console.error("Error fetching total value:", error);
      }
    };
  
    fetchTotalValue();
  }, []);
  
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h4" color="#2a7f06">Total Portfolio Value:</Typography>
      <Typography variant="h5">€{totalValue.toFixed(2)}</Typography>
    </Box>
  );
};

export default TotalValue;
