import React from "react";
import "./Login.css";
import WelcomeSide from "./WelcomeSide";
import LoginForm from "./LoginForm";
export default (props) => (
  <div className="login-window">
    <WelcomeSide />
    <LoginForm />
  </div>
);
