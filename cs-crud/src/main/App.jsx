import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Routes from "./Routes";
import "./App.css";
export default (props) => (
  <div className="app">
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SnackbarProvider>
  </div>
);
