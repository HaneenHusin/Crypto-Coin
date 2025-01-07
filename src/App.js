
import React, { Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./styles/theme"; 
import Layout from "./components/ui/Layout";
import NotFound from "./pages/NotFound";
import { ClipLoader } from 'react-spinners';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Home = React.lazy(() =>
delay(2000).then(() => import('./pages/Home')));
const CoinsPage = React.lazy(() =>
delay(2000).then(() => import('./pages/CoinsPage')));

function MainApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '20%' }}>
          <ClipLoader size={80} color="#2a7f06" />
        </div>}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins" element={<CoinsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default MainApp;
