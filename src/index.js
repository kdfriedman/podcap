import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import AppRouter from "./routes/AppRouter";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    brand: {
      500: "#6E41E2",
    },
  },
});
// render app router which bootstraps the application
ReactDOM.render(
  //initalize chakra ui library and make available to all components
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
