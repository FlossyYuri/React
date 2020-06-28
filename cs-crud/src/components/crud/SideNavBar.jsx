import React from "react";
import { Typography, Tabs, Tab } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./SideNavBar.css";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default (props) => (
  <div className="side-bar">
    <Typography variant="h5" gutterBottom>
      Bem Vindo <br />
      de volta
    </Typography>
    <Tabs
      orientation="vertical"
      variant="scrollable"
      className="tabsGroup"
      value={props.tab}
      onChange={props.updateTab}
      aria-label="Vertical tabs example"
    >
      <Tab icon={<VisibilityIcon />} label="Visualizar" {...a11yProps(0)} />
      {props.user && props.user.admin && (
        <Tab icon={<AddCircleIcon />} label="Cadastrar" {...a11yProps(1)} />
      )}
    </Tabs>
  </div>
);
