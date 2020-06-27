import React from "react";
import { Typography, Button } from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import SaveIcon from "@material-ui/icons/Save";
import "./ViewClient.css";

export default function ClientView(props) {
  return (
    <div className="view-client">
      <Typography className="screen-title" variant="h5" gutterBottom>
        Visualizar Cliente
      </Typography>
    </div>
  );
}
