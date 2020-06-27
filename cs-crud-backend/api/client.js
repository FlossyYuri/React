module.exports = (app) => {
  const {
    existsOrError,
    validName,
    validBI,
    validAddress,
    validPhones,
    validEmails,
  } = app.api.validation;
  const Client = app.mongoose.model("Client", {
    username: String,
    bi: String,
    address: Object,
    phones: Array,
    emails: Array,
  });
  const save = async (req, res) => {
    const client = { ...req.body };
    if (req.params.id) client.id = req.params.id;

    try {
      existsOrError(client.name, "Introduza o Nome");
      existsOrError(client.bi, "Introduza o BI");
      existsOrError(client.address, "Introduza pelo menos um endereço");
      existsOrError(client.phones, "Introduza pelo menos um telefone");
      existsOrError(client.emails, "Introduza o Email");
      validName(
        client.name,
        "Nome invalido, deve ter entre 3 a 100 caracteres"
      );
      validBI(client.bi, "BI invalido, deve conter 13 caracteres");
      validAddress(
        client.address,
        "Endereço invalido, preencha os campos devidamente"
      );
      validPhones(
        client.phones,
        "Telefone(s) invalido(s), preencha devidamente todos campos"
      );
      validEmails(client.emails, "Email(s) invalido(s), preencha devidamente");
      const clientCollection = new Client(client);
      clientCollection.save().then((saved) => res.json(saved));
      // client.findOne({}, {}, { sort: { createdAt: -1 } })
      //   .then((client) => {
      //     const defaultclient = {
      //       username: 0,
      //       bi: 0,
      //       address: {},
      //       phones: [],
      //       emails: [],
      //     };
      //     res.json(client || defaultclient);
      //   })
      //   .catch((error) => res.status(400).send(error));
    } catch (msg) {
      return res.status(500).send(msg);
    }
    if (client.id) {
      // Update
    } else {
      // Insert
    }
  };

  const remove = async (req, res) => {
    Client.deleteOne({ _id: req.params.id })
      .then((client) => {
        if (client) res.json(client);
        else res.json({});
      })
      .catch((error) => res.status(400).send(error));
  };

  const filterClient = (client) => {
    const { _id, name, bi, address, phones, emails } = client;
    const c = { id: _id, name, bi, address, phones, emails };
    return c;
  };
  const filterClients = (clients) => {
    return clients.map((client) => filterClient(client));
  };

  const get = (req, res) => {
    Client.find()
      .then((clients) => {
        res.json(filterClients(clients));
      })
      .catch((error) => res.status(400).send(error));
  };

  const getById = (req, res) => {
    Client.findOne({ _id: req.params.id })
      .then((client) => {
        console.log(client);
        if (client) res.json(filterClient(client));
        else res.json({});
      })
      .catch((error) => res.status(400).send(error));
  };
  return { save, remove, get, getById };
};
