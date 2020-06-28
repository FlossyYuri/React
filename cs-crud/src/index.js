import React from "react";
import ReactDOM from "react-dom";
import App from "./main/App";
import * as serviceWorker from "./serviceWorker";
// require("axios").defaults.headers.common["Authorization"] =
//   "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImlhdCI6MTU5MzE4MDc3OSwiZXhwIjoxNTkzNDM5OTc5fQ.4yV9g94_u81_gtnLaSexi_o6bVg08a0YQq0oiPx3hp0";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
