
import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import MainApp  from "./App";
import "./styles/theme";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Please check your HTML file.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <MainApp  />
  </StrictMode>
);
