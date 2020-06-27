import React, { Component } from "react";
import "./Crud.css";
import SideNavBar from "./SideNavBar";
import ClientView from "./ClientView";
export default class Wrapper extends Component {
  state = { tab: 0 };
  constructor(props) {
    super(props);
    this.updateTab = this.updateTab.bind(this);
  }
  updateTab(event, tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <div className="crud-window">
        <SideNavBar tab={this.state.tab} updateTab={this.updateTab} />
        <ClientView tab={this.state.tab} updateTab={this.updateTab} />
      </div>
    );
  }
}
