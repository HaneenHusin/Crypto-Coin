import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#133e00d6",
        color: "#fff",
        padding: "20px 0",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              CryptoApp
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              The best place to track your crypto investments.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link href="#" color="inherit" sx={{ marginBottom: 1 }}>
                About Us
              </Link>
              <Link href="#" color="inherit" sx={{ marginBottom: 1 }}>
                Contact
              </Link>
              <Link href="#" color="inherit" sx={{ marginBottom: 1 }}>
                Terms & Conditions
              </Link>
              <Link href="#" color="inherit" sx={{ marginBottom: 1 }}>
                Privacy Policy
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Link href="#" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} CryptoApp. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
