import React, { Component } from "react";
import { Typography, Snackbar, Slide } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import MuiAlert from "@material-ui/lab/Alert";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
import ViewClient from "./ViewClient";
import RegisterClient from "./RegisterClient";
import "./ClientView.css";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

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

export default class ClientView extends Component {
  state = {
    clientToEdit: null,
    snackBar: {
      open: false,
      text: "",
      severity: "success",
    },
    // anchorEl: null,
    // open: null,
  };
  constructor(props) {
    super(props);
    this.setClientToEdit = this.setClientToEdit.bind(this);
    this.updateSnackbar = this.updateSnackbar.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    // this.setAnchorEl = this.setAnchorEl.bind(this)
    // this.handleMenu = this.handleMenu.bind(this)
    // this.handleClose = this.handleClose.bind(this)
  }
  handleSnackBarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.updateSnackbar(false);
  }
  updateSnackbar(open, severity, text) {
    const snackBar = { ...this.state.snackBar };
    snackBar.open = open;
    severity && (snackBar.severity = severity);
    text && (snackBar.text = text);
    this.setState({ snackBar });
  }

  // setAnchorEl(anchorEl) {
  //   this.setState({ anchorEl });
  // }
  // handleMenu = (event) => {
  //   console.log(event.target)
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setAnchorEl(null);
  // };
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
                // onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {/* <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={this.state.open}
                onClose={this.state.handleClose}
              >
                <MenuItem onClick={this.state.handleClose}>Logout</MenuItem>
              </Menu> */}
              <Typography variant="h6">John Jones</Typography>
            </div>
            <IconButton edge="start" className="btn-close" aria-label="menu">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <TabPanel className="tab" value={this.props.tab} index={0}>
          <ViewClient
            {...this.props}
            updateSnackbar={this.updateSnackbar}
            updateTab={this.props.updateTab}
            setClientToEdit={this.setClientToEdit}
            clientToEdit={this.state.clientToEdit}
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

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={SlideTransition}
          open={this.state.snackBar.open}
          autoHideDuration={5000}
          onClose={this.handleSnackBarClose}
        >
          <MuiAlert
            onClose={this.handleSnackBarClose}
            severity={this.state.snackBar.severity}
            elevation={6}
            variant="filled"
          >
            {this.state.snackBar.text}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}
