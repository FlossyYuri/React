import React from "react";
import Api from "../config/index";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Routes from "./Routes";
import "./App.css";
export default function (props) {
  Api.getUser()
  return (
    <div className="app">
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}
