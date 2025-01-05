import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PriceChart({ coinId = "bitcoin" }) {
  const [chartData, setChartData] = useState({
    labels: [], // Initialize with empty arrays
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear any previous errors

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: "eur",
              days: 7, // Data for the last 7 days
            },
          }
        );

        const prices = response.data.prices;
        const labels = prices.map((price) =>
          new Date(price[0]).toLocaleDateString()
        );
        const data = prices.map((price) => price[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (EUR)`,
              data,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4, // Smooth curve
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to fetch chart data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchChartData();
  }, [coinId]);

  if (loading) {
    return <Typography>Loading chart...</Typography>;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {coinId.toUpperCase()} Price Chart (Last 7 Days)
      </Typography>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (EUR)",
              },
            },
          },
        }}
      />
    </Box>
  );
}

export default PriceChart;
