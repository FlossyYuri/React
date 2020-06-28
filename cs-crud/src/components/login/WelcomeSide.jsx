import React from "react";
import "./WelcomeSide.css";
import { Typography, Avatar } from "@material-ui/core";
export default (props) => (
  <div className="welcome-side">
    <Avatar />
    <Typography variant="body1" gutterBottom>
      Olá, Seja bem vindo a minha primeira aplicação react (Self Made), espero
      que tenha uma boa experiencia e desfrute da bela interface preparada com
      am❤r. 
    </Typography>
  </div>
);
