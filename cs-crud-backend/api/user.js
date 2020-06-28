const { user } = require("../.env");
module.exports = (app) => {
  const get = (req, res) => {
    res.json(user);
  };

  return { get };
};
