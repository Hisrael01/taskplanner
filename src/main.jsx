import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import LandingPage from "./App.jsx";
import ErrorBoundary from "@/components/ErrorBoundary";


// Import styles
import "./index.css";
import "./styles/globals.css";




const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  colors: {
    brand: {
      50: "#fff5f0",
      100: "#ffe6d6",
      200: "#ffccad",
      300: "#ffb085",
      400: "#ff945c",
      500: "#ff6b35",
      600: "#e55a2b",
      700: "#cc4921",
      800: "#b23817",
      900: "#99270d",
    },
    navy: {
      50: "#f0f4f8",
      100: "#d9e2ec",
      200: "#bcccdc",
      300: "#9fb3c8",
      400: "#829ab1",
      500: "#627d98",
      600: "#486581",
      700: "#334e68",
      800: "#243b53",
      900: "#1a365d",
    },
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
        <ChakraProvider theme={theme}>
          <StrictMode>
            <ErrorBoundary>
                <LandingPage />
            </ErrorBoundary>
          </StrictMode>
        </ChakraProvider>
);
