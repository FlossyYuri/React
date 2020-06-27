import React from "react";
import "./LoginForm.css";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
export default (props) => (
  <div className="form-side">
    <Typography variant="h4" gutterBottom>
      Bem Vindo
    </Typography>
    <TextField
      label="Nome de usuário"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
    <TextField
      label="Senha"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
    <Button
      variant="contained"
      size="large"
      className="btn-login"
      component={RouterLink}
      to="/crud"
    >
      {"Entrar".toUpperCase()}
    </Button>
  </div>
);
