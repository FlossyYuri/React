import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import ClientCard from "./auxiliar/ClientCard";
import "./ViewClient.css";

const client = {
  name: "Emerson Yuri",
  bi: "1231231230123",
  address: {
    zipCode: "0000",
    publicPlace: "Av. Mario Coluna",
    neighborHood: "3 de fevereiro",
    city: "Maputo",
  },
  phones: ["+258 84 052 1586"],
  emails: ["emerson.yur@gmail.com"],
};
const data = {
  clients: [client, client, client],
};

export default class ClientView extends Component {
  state = { ...data };
  render() {
    return (
      <div className="view-client">
        <Typography className="screen-title" variant="h5" gutterBottom>
          Visualizar Cliente
        </Typography>
        <Grid className="clients-panel" container spacing={1}>
          {this.state.clients.map((client, index) => (
            <Grid key={index} item sm={12} lg={6} xl={4}>
              <ClientCard client={client} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
