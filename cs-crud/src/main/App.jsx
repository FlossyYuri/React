import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import "./App.css";
export default (props) => (
  <div className="app">
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </div>
);
