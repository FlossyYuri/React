import React, { Component } from "react";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import SaveIcon from "@material-ui/icons/Save";
import "./RegisterClient.css";

const user = {
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
  user: JSON.parse(JSON.stringify(user)),
  helper: JSON.parse(JSON.stringify(user)),
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
    if (this.state.user.emails.length < 4) {
      const user = { ...this.state.user };
      user.emails.push("");
      this.setState({ user });
    }
  }
  removeEmail() {
    if (this.state.user.emails.length > 1) {
      const user = { ...this.state.user };
      user.emails.pop();
      this.setState({ user });
    }
  }
  addPhone() {
    if (this.state.user.phones.length < 4) {
      const user = { ...this.state.user };
      user.phones.push("");
      this.setState({ user });
    }
  }
  removePhone() {
    if (this.state.user.phones.length > 1) {
      const user = { ...this.state.user };
      user.phones.pop();
      this.setState({ user });
    }
  }
  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }
  updateAddress(event) {
    const user = { ...this.state.user };
    user.address[event.target.name] = event.target.value;
    this.setState({ user });
  }
  updateArray(event) {
    const user = { ...this.state.user };
    user[event.target.name][event.target.attributes.index.value] =
      event.target.value;
    this.setState({ user });
  }
  clear() {
    this.setState(JSON.parse(JSON.stringify(initState)));
  }
  validate() {
    let hasError = false;
    const helper = JSON.parse(JSON.stringify(user));

    if (
      this.state.user.name.length < 3 ||
      this.state.user.name.length > 100 ||
      !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$/.test(
        this.state.user.name
      )
    ) {
      hasError = true;
      helper.name = "Deve conter de 3 a 100 caracteres";
    }

    if (this.state.user.bi.length !== 13) {
      hasError = true;
      helper.bi = "Deve conter 13 caracteres";
    }
    if (!this.state.user.address.zipCode) {
      hasError = true;
      helper.address.zipCode = "Campo obrigatório";
    }
    if (!this.state.user.address.publicPlace) {
      hasError = true;
      helper.address.publicPlace = "Campo obrigatório";
    }
    if (!this.state.user.address.neighborHood) {
      hasError = true;
      helper.address.neighborHood = "Campo obrigatório";
    }
    if (!this.state.user.address.city) {
      hasError = true;
      helper.address.city = "Campo obrigatório";
    }
    this.state.user.phones.forEach((phone, index) => {
      if (phone.length < 9) {
        hasError = true;
        helper.phones[index] = "Introduza corretamente o telefone";
      }
    });
    this.state.user.emails.forEach((email, index) => {
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
      const data = JSON.parse(JSON.stringify(this.state.user));
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
                value={this.state.user.name}
                onChange={this.updateField}
                name="name"
                label="Nome"
                helperText={this.state.helper.name}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                value={this.state.user.bi}
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
                    value={this.state.user.address.zipCode}
                    onChange={this.updateAddress}
                    name="zipCode"
                    placeholder="ZIPCODE"
                    helperText={this.state.helper.address.zipCode}
                  />
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                  <TextField
                    value={this.state.user.address.publicPlace}
                    onChange={this.updateAddress}
                    name="publicPlace"
                    placeholder="Logradouro"
                    helperText={this.state.helper.address.publicPlace}
                  />
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                  <TextField
                    value={this.state.user.address.neighborHood}
                    onChange={this.updateAddress}
                    name="neighborHood"
                    placeholder="Bairro"
                    helperText={this.state.helper.address.neighborHood}
                  />
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                  <TextField
                    value={this.state.user.address.city}
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
                    <span>{`(${this.state.user.phones.length})`}</span>
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
                {this.state.user.phones.map((phone, index) => (
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
                    Emails <span>{`(${this.state.user.emails.length})`}</span>
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
                {this.state.user.emails.map((email, index) => (
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
