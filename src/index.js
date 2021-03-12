import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles/index.css";
import AppRouter from "./routes/AppRouter";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";

//Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    brand: {
      500: "#6E41E2",
    },
  },
});

// render app router which bootstraps the application
ReactDOM.render(
  //initalize react-dnd library and make available to all components
  // set here to avoid onDragStart uncontrolled dom errors
  <DndProvider backend={HTML5Backend}>
    {/* initalize chakra ui library and make available to all components */}
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
    </ChakraProvider>
  </DndProvider>,
  document.getElementById("root")
);
