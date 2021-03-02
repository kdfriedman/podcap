import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import AppRouter from "./routes/AppRouter";

// render app router which bootstraps the application
ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
