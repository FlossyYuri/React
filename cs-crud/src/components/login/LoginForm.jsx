import Api from "../../config/index";
import React from "react";
import { withSnackbar, useSnackbar } from "notistack";
import "./LoginForm.css";
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
  Switch,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
const userOBJ = { username: "", password: "", admin: false };

const LoginForm = (props) => {
  const [user] = React.useState(userOBJ);
  const [helper] = React.useState(JSON.parse(JSON.stringify(userOBJ)));
  const { enqueueSnackbar } = useSnackbar();
  const updateField = (event) => {
    user[event.target.name] = event.target.value;
  };
  const updateAdmin = (event) => {
    user.admin = event.target.checked;
  };
  const onSubmit = () => {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    Api.signIn(
      user,
      (resp) => {
        if (resp.status === 200) {
          Api.setUserToken(resp.data);
          enqueueSnackbar(`Bem vindo de volta `, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          const link = document.getElementById("hidden");
          link.href = "/crud";
          link.click();
        }
      },
      showError
    );
  };
  const showError = (e) => {
    console.log(e.response.data);
    if (e && e.response && e.response.data) {
      enqueueSnackbar(e.response.data, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else if (typeof e === "string") {
      enqueueSnackbar(e, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar("Ops... Algo deu erado", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
  return (
    <div className="form-side">
      <Typography variant="h4" gutterBottom>
        Bem Vindo
      </Typography>
      <TextField
        label="Nome de usuário"
        name="username"
        helperText={helper.username}
        onChange={updateField}
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
        name="password"
        type="password"
        helperText={helper.password}
        onChange={updateField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <div className="switch">
        <span>Admin</span>
        <Switch name="admin" onChange={updateAdmin} />
      </div>
      <Button
        variant="contained"
        size="large"
        className="btn-login"
        onClick={onSubmit}
      >
        {"Entrar".toUpperCase()}
      </Button>
    </div>
  );
};
export default withSnackbar(LoginForm);
