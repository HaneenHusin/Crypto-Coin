// src/App.js
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./styles/theme"; 
import Layout from "./components/ui/Layout";
import Home from "./pages/Home";
import CoinsPage from "./pages/CoinsPage";
import NotFound from "./pages/NotFound";

function MainApp () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins" element={<CoinsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default MainApp ;
