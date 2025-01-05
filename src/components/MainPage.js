
import React from "react";
import { Container,  Grid, Box } from "@mui/material";
import CurrentPrice from "./CurrentPrice";
import WeeklyChange from "./WeeklyChange";
import PriceChart from "./PriceChart";
import PriceHistoryTable from "./PriceHistoryTable";
import CryptoHeader from "./CryptoHeader";
import ImageSlider from "./ui/ImageSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainPage() {
  return (
    <Box>
     
      <Container>
        <CryptoHeader />
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <CurrentPrice />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                position: "relative",
                backgroundImage: 'url("assets/bitcoin-3.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                padding: "40px 20px",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <WeeklyChange />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <PriceHistoryTable />
          </Grid>
          <Grid item xs={12}>
            <PriceChart coinId="bitcoin" />
          </Grid>
          <Grid item xs={12}>
            <PriceChart coinId="ethereum" />
          </Grid>
        </Grid>
      </Container>
      <ImageSlider />
      <br />
    </Box>
  );
}

export default MainPage;
