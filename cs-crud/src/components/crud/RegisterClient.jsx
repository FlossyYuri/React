import React, { Component } from "react";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import SaveIcon from "@material-ui/icons/Save";
import "./RegisterClient.css";

const client = {
  name: "",
  bi: "",
  address: {
    zipCode: "",
    publicPlace: "",
    neighborHood: "",
    city: "",
  },
  phones: [""],
  emails: [""],
};

// i dint use the spread operator to clone to avoid conflicts of different objects pointing to the same references
const initState = {
  client: JSON.parse(JSON.stringify(client)),
  helper: JSON.parse(JSON.stringify(client)),
  data: {},
};

export default class ClientView extends Component {
  state = JSON.parse(JSON.stringify(initState));
  constructor(props) {
    super(props);
    this.addEmail = this.addEmail.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
    this.addPhone = this.addPhone.bind(this);
    this.removePhone = this.removePhone.bind(this);
    this.updateField = this.updateField.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateArray = this.updateArray.bind(this);
    this.validate = this.validate.bind(this);
    this.clear = this.clear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  addEmail() {
    if (this.state.client.emails.length < 4) {
      const client = { ...this.state.client };
      client.emails.push("");
      this.setState({ client });
    }
  }
  removeEmail() {
    if (this.state.client.emails.length > 1) {
      const client = { ...this.state.client };
      client.emails.pop();
      this.setState({ client });
    }
  }
  addPhone() {
    if (this.state.client.phones.length < 4) {
      const client = { ...this.state.client };
      client.phones.push("");
      this.setState({ client });
    }
  }
  removePhone() {
    if (this.state.client.phones.length > 1) {
      const client = { ...this.state.client };
      client.phones.pop();
      this.setState({ client });
    }
  }
  updateField(event) {
    const client = { ...this.state.client };
    client[event.target.name] = event.target.value;
    this.setState({ client });
  }
  updateAddress(event) {
    const client = { ...this.state.client };
    client.address[event.target.name] = event.target.value;
    this.setState({ client });
  }
  updateArray(event) {
    const client = { ...this.state.client };
    client[event.target.name][event.target.attributes.index.value] =
      event.target.value;
    this.setState({ client });
  }
  clear() {
    this.setState(JSON.parse(JSON.stringify(initState)));
  }
  validate() {
    let hasError = false;
    const helper = JSON.parse(JSON.stringify(client));

    if (
      this.state.client.name.length < 3 ||
      this.state.client.name.length > 100 ||
      !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$/.test(
        this.state.client.name
      )
    ) {
      hasError = true;
      helper.name = "Deve conter de 3 a 100 caracteres";
    }

    if (this.state.client.bi.length !== 13) {
      hasError = true;
      helper.bi = "Deve conter 13 caracteres";
    }
    if (!this.state.client.address.zipCode) {
      hasError = true;
      helper.address.zipCode = "Campo obrigatório";
    }
    if (!this.state.client.address.publicPlace) {
      hasError = true;
      helper.address.publicPlace = "Campo obrigatório";
    }
    if (!this.state.client.address.neighborHood) {
      hasError = true;
      helper.address.neighborHood = "Campo obrigatório";
    }
    if (!this.state.client.address.city) {
      hasError = true;
      helper.address.city = "Campo obrigatório";
    }
    this.state.client.phones.forEach((phone, index) => {
      if (phone.length < 9) {
        hasError = true;
        helper.phones[index] = "Introduza corretamente o telefone";
      }
    });
    this.state.client.emails.forEach((email, index) => {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        hasError = true;
        helper.emails[index] = "Email invalido";
      }
    });

    this.setState({ helper });
    return hasError;
  }
  onSubmit() {
    const err = this.validate();
    if (!err) {
      const data = JSON.parse(JSON.stringify(this.state.client));
      this.setState({ data });
    }
  }
  render() {
    return (
      <div className="register-client">
        <Typography className="screen-title" variant="h5" gutterBottom>
          Cadastrar Cliente
        </Typography>
        <form>
          <Grid container spacing={1}>
            <Grid item sm={12} md={6}>
              <TextField
                value={this.state.client.name}
                onChange={this.updateField}
                name="name"
                label="Nome"
                helperText={this.state.helper.name}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                value={this.state.client.bi}
                onChange={this.updateField}
                name="bi"
                label="BI"
                helperText={this.state.helper.bi}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Endereço
                  </Typography>
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                  <TextField
                    value={this.state.client.address.zipCode}
                    onChange={this.updateAddress}
                    name="zipCode"
                    placeholder="ZIPCODE"
                    helperText={this.state.helper.address.zipCode}
                  />
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                  <TextField
                    value={this.state.client.address.publicPlace}
                    onChange={this.updateAddress}
                    name="publicPlace"
                    placeholder="Logradouro"
                    helperText={this.state.helper.address.publicPlace}
                  />
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                  <TextField
                    value={this.state.client.address.neighborHood}
                    onChange={this.updateAddress}
                    name="neighborHood"
                    placeholder="Bairro"
                    helperText={this.state.helper.address.neighborHood}
                  />
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                  <TextField
                    value={this.state.client.address.city}
                    onChange={this.updateAddress}
                    name="city"
                    placeholder="Cidade"
                    helperText={this.state.helper.address.city}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} className="flex-row">
                  <Typography variant="subtitle1" gutterBottom>
                    Telefones{" "}
                    <span>{`(${this.state.client.phones.length})`}</span>
                  </Typography>

                  <Button
                    onClick={this.addPhone}
                    variant="contained"
                    size="small"
                    className="btn-aux btn-add"
                    startIcon={<AddCircleIcon />}
                  >
                    ADD
                  </Button>
                  <Button
                    onClick={this.removePhone}
                    variant="contained"
                    size="small"
                    className="btn-aux btn-rem"
                    startIcon={<DeleteSweepIcon />}
                  >
                    REM
                  </Button>
                </Grid>
                {this.state.client.phones.map((phone, index) => (
                  <Grid key={index + "Phone"} item sm={12} md={4} lg={3}>
                    <TextField
                      value={phone}
                      onChange={this.updateArray}
                      name="phones"
                      placeholder="Phone"
                      helperText={this.state.helper.phones[index]}
                      inputProps={{ index }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* Emails */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} className="flex-row">
                  <Typography variant="subtitle1" gutterBottom>
                    Emails <span>{`(${this.state.client.emails.length})`}</span>
                  </Typography>

                  <Button
                    onClick={this.addEmail}
                    variant="contained"
                    size="small"
                    className="btn-aux btn-add"
                    startIcon={<AddCircleIcon />}
                  >
                    ADD
                  </Button>
                  <Button
                    onClick={this.removeEmail}
                    variant="contained"
                    size="small"
                    className="btn-aux btn-rem"
                    startIcon={<DeleteSweepIcon />}
                  >
                    REM
                  </Button>
                </Grid>
                {this.state.client.emails.map((email, index) => (
                  <Grid key={index} item sm={12} md={4} lg={3}>
                    <TextField
                      value={email}
                      onChange={this.updateArray}
                      name="emails"
                      placeholder="Email"
                      helperText={this.state.helper.emails[index]}
                      inputProps={{ index }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <span>{JSON.stringify(this.state.data)}</span>
        </form>
        <div className="actions-bar">
          <Button
            onClick={this.clear}
            variant="contained"
            size="large"
            className="btn-form clear"
            startIcon={<DeleteSweepIcon />}
          >
            Limpar
          </Button>
          <Button
            onClick={this.onSubmit}
            variant="contained"
            size="large"
            className="btn-form save"
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </div>
      </div>
    );
  }
}
