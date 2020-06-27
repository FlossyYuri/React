import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Login from "../components/login/Login";
import Crud from "../components/crud/Crud";

export default (props) => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/crud" component={Crud} />
    <Redirect from="*" to="/" />
  </Switch>
);
