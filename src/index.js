import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import AppRouter from "./routes/AppRouter";
import { ChakraProvider } from "@chakra-ui/react";

// render app router which bootstraps the application
ReactDOM.render(
  //initalize chakra ui library and make available to all components
  <ChakraProvider>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
