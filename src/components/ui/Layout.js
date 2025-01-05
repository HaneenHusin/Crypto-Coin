
import React from "react";
import { Box } from "@mui/material";
import AppBar from "./AppBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box>
      <AppBar /> 
      <Box sx={{  minHeight: "calc(100vh - 120px)" }}>
        {children} 
      </Box>
      <Footer /> 
    </Box>
  );
};

export default Layout;
