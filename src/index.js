import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles/index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "focus-visible/dist/focus-visible";
import AppRouter from "./routes/AppRouter";
import { BuilderProvider } from "./context/BuilderContext";

// Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "950px",
  xl: "1200px",
});

//Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    brand: {
      500: "#6E41E2",
    },
  },
  breakpoints,
});

// render app router which bootstraps the application
ReactDOM.render(
  //initalize react-dnd library and make available to all components
  // set here to avoid onDragStart uncontrolled dom errors */}
  <DndProvider backend={HTML5Backend}>
    {/* initalize chakra ui library and make available to all components */}
    <ChakraProvider theme={theme}>
      <BuilderProvider>
        <React.StrictMode>
          <AppRouter />
        </React.StrictMode>
      </BuilderProvider>
    </ChakraProvider>
  </DndProvider>,
  document.getElementById("root")
);
