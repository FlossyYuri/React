const { user } = require("../.env");
const bcrypt = require("bcrypt-nodejs");
module.exports = (app) => {
  const get = (req, res) => {
    res.json(user);
  };

  return { get };
};
