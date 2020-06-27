const { user } = require("../.env");
const bcrypt = require("bcrypt-nodejs");
module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const get = (req, res) => {
    res.json(user);
  };

  return { get };
};
