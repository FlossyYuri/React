import React from "react";
import { Typography, Tabs, Tab } from "@material-ui/core";
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
      <Tab label="Visualizar" {...a11yProps(0)} />
      <Tab label="Cadastrar" {...a11yProps(1)} />
      <Tab label="Atualizar" {...a11yProps(2)} />
    </Tabs>
  </div>
);
