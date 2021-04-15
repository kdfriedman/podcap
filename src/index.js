import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import "./styles/index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "focus-visible/dist/focus-visible";
import AppRouter from "./routes/AppRouter";
import { BuilderProvider } from "./context/BuilderContext";
import { TouchDeviceProvider } from "./context/TouchDeviceContext";

import isTouchDevice from "./util/getDeviceType";

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

const InitApp = () => {
  //  determine if user is on touch device using screen width to conditionally render dnd-library
  const isTouchScreen = isTouchDevice() ? TouchBackend : HTML5Backend;
  return (
    //initalize react-dnd library and make available to all components
    // set here to avoid onDragStart uncontrolled dom errors */}
    <DndProvider backend={isTouchScreen}>
      {/* initalize chakra ui library and make available to all components */}
      <ChakraProvider theme={theme}>
        {/* builder context provides the accordion layout with corresponding IDs and text properties*/}
        <BuilderProvider>
          {/* touch device context provides app access to state of visibility 
          of preview and builder sections on smaller devices */}
          <TouchDeviceProvider>
            <React.StrictMode>
              <AppRouter />
            </React.StrictMode>
          </TouchDeviceProvider>
        </BuilderProvider>
      </ChakraProvider>
    </DndProvider>
  );
};

// render app router which bootstraps the application
ReactDOM.render(<InitApp />, document.getElementById("root"));
