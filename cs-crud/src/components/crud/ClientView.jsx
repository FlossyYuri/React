import Api from "../../config/index";
import React, { Component } from "react";
import { Typography, TextField } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import ViewClient from "./ViewClient";
import RegisterClient from "./RegisterClient";
import "./ClientView.css";
import { withSnackbar } from "notistack";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </div>
  );
}

class ClientView extends Component {
  state = {
    clientToEdit: null,
    search: "",
  };
  constructor(props) {
    super(props);
    this.setClientToEdit = this.setClientToEdit.bind(this);
    this.updateSnackbar = this.updateSnackbar.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleSnackBarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.updateSnackbar(false);
  }
  logout() {
    Api.logout();
    window.location.href = window.location.origin;
  }
  updateSnackbar(open, severity, text) {
    const snackBar = { ...this.state.snackBar };
    snackBar.open = open;
    severity && (snackBar.severity = severity);
    text && (snackBar.text = text);
    this.setState({ snackBar });
  }
  updateSearch(event) {
    const search = event.target.value;
    this.setState({ search });
  }

  clearSearch() {
    const search = "";
    this.setState({ search });
  }

  setClientToEdit(clientToEdit) {
    this.setState({ clientToEdit });
  }

  render() {
    return (
      <div className="client-view">
        <AppBar position="static">
          <Toolbar>
            <div className="client-profile">
              <IconButton
                aria-label="account of current client"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Typography variant="h6">
                {this.props.user && this.props.user.username}
              </Typography>
            </div>
            {this.props.tab === 0 && (
              <div className="search-tool">
                <TextField
                  value={this.state.search}
                  className="pesquisa"
                  placeholder={"Pesquisar por nome"}
                  onChange={this.updateSearch}
                />
                <IconButton aria-label="search" onClick={this.clearSearch}>
                  <DeleteSweepIcon />
                </IconButton>
              </div>
            )}
            <div className="logout">
              <span>LOGOUT</span>
              <IconButton
                edge="start"
                className="btn-close"
                aria-label="menu"
                onClick={this.logout}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <TabPanel className="tab scroll" value={this.props.tab} index={0}>
          <ViewClient
            {...this.props}
            updateSnackbar={this.updateSnackbar}
            updateTab={this.props.updateTab}
            setClientToEdit={this.setClientToEdit}
            {...this.state}
          />
        </TabPanel>
        <TabPanel className="tab" value={this.props.tab} index={1}>
          <RegisterClient
            {...this.props}
            updateSnackbar={this.updateSnackbar}
            setClientToEdit={this.setClientToEdit}
            clientToEdit={this.state.clientToEdit}
          />
        </TabPanel>
      </div>
    );
  }
}
export default withSnackbar(ClientView);
