import Api from "../../config/index";
import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import ClientCard from "./auxiliar/ClientCard";
import "./ViewClient.css";
import { withSnackbar } from "notistack";

class ViewClient extends Component {
  state = {
    clients: [],
  };
  constructor(props) {
    super(props);
    this.deleteClient = this.deleteClient.bind(this);
    this.getClients = this.getClients.bind(this);
    this.editClient = this.editClient.bind(this);
    this.showError = this.showError.bind(this);
  }
  componentWillMount() {
    this.getClients();
  }
  showError(e) {
    // console.log(e.response);
    if (e && e.response && e.response.data) {
      let text;
      switch (e.response.status) {
        case 401:
          text = "Ops, vc não está autenticado.";
          if (this.props.user) {
            const link = document.getElementById("hidden");
            link.href = "/";
            setTimeout(() => {
              document.getElementById("hidden").click();
            }, 10000);
          }
          break;
        default:
          text = e.response.data;
      }
      this.props.enqueueSnackbar(text, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else if (typeof e === "string") {
      this.props.enqueueSnackbar(e, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      this.props.enqueueSnackbar("Ops... Algo deu errado", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }
  getClients() {
    this.setState({ clients: [] });
    Api.getClients((resp) => {
      this.setState({ clients: [...resp.data] });
    }, this.showError);
  }
  deleteClient(event) {
    Api.deleteClient(
      event.target.attributes.uid.value,
      (resp) => {
        if (resp.data) {
          this.getClients();
        }
      },
      this.showError
    );
  }
  editClient(event) {
    const clientToEdit = {
      ...this.state.clients[event.target.attributes.index.value],
    };
    this.props.setClientToEdit(clientToEdit);
    this.props.updateSnackbar(
      true,
      "info",
      `Editando o/a cliente ${clientToEdit.name}`
    );
    this.props.updateTab(null, 1);
  }
  render() {
    return (
      <div className="view-client">
        <Typography className="screen-title" variant="h5" gutterBottom>
          Visualizar Clientes
        </Typography>
        <Grid className="clients-panel" container spacing={1}>
          {this.state.clients
            .filter((client) =>
              client.name
                .toLowerCase()
                .includes(this.props.search.toLowerCase())
            )
            .map((client, index) => (
              <Grid key={index} item sm={12} lg={6} xl={4}>
                <ClientCard
                  clickEdit={this.editClient}
                  clickDel={this.deleteClient}
                  clientIndex={index}
                  client={this.state.clients[index]}
                  user={this.props.user}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
export default withSnackbar(ViewClient);
