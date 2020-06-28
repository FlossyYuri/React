import React from "react";
import "./Login.css";
import WelcomeSide from "./WelcomeSide";
import LoginForm from "./LoginForm";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
export default (props) => (
  <div className="login-window">
    <WelcomeSide  />
    <LoginForm />
    <Button id="hidden" component={RouterLink} to="/crud" />
  </div>
);
