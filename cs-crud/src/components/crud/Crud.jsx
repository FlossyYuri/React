import Api from "../../config/index";
import React, { Component } from "react";
import "./Crud.css";
import SideNavBar from "./SideNavBar";
import ClientView from "./ClientView";
import { withSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
class Crud extends Component {
  // this class is responsible to communicate both Components SideNavBar and ClientView
  state = { tab: 0, user: Api.getUser() };
  constructor(props) {
    super(props);
    this.updateTab = this.updateTab.bind(this);
    setInterval(() => {
      console.clear();
    }, 10 * 1000);
  }
  updateTab(event, tab) {
    this.setState({ tab });
  }
  updateUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div className="crud-window">
        <SideNavBar {...this.state} updateTab={this.updateTab} />
        <ClientView {...this.state} updateTab={this.updateTab} />
        <Button id="hidden" component={RouterLink} to="/crud" />
      </div>
    );
  }
}
export default withSnackbar(Crud);
