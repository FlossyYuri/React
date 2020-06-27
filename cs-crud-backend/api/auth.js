const { user,authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
module.exports = (app) => {
  const signIn = async (req, res) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send("Informe Usuario e senha");
    }
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      username: user.username,
      admin: user.admin,
      iat: now,
      exp: now + 60 * 60 * 24 * 3,
    };
    console.log("secret " + authSecret);
    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };

  const validateToken = async (req, res) => {
    const userData = req.body || null;
    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) { }
    res.send(false);
  };

  return { signIn, validateToken };
};
