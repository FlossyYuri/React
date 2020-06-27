import React from "react";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ViewClient from "./ViewClient";
import RegisterClient from "./RegisterClient";
import "./ClientView.css";

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

export default function ClientView(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="client-view">
      <AppBar position="static">
        <Toolbar>
          <div className="user-profile">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Typography variant="h6">John Jones</Typography>
          </div>
          <IconButton edge="start" className="btn-close" aria-label="menu">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <TabPanel className="tab" value={props.tab} index={0}>
        <ViewClient />
      </TabPanel>
      <TabPanel className="tab" value={props.tab} index={1}>
        <RegisterClient />
      </TabPanel>
      <TabPanel className="tab" value={props.tab} index={2}>
        Item 3
      </TabPanel>
    </div>
  );
}
