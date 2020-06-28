const { user, authSecret } = require("../.env");
const jwt = require("jwt-simple");
module.exports = (app) => {
  const signIn = async (req, res) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send("Informe Usuario e senha");
    }

    if (user.username !== req.body.username)
      return res.status(400).send("Usuário não encontrado");
    if (user.password !== req.body.password)
      return res.status(401).send("Senha inválida");
    try {
      if (req.body.username !== "admin" || req.body.password !== "123456")
        throw res.status(500).send(msg);
        const now = Math.floor(Date.now() / 1000);
        const payload = {
        username: user.username,
        admin: req.body.admin,
        iat: now,
        exp: now + 60 * 60 * 24 * 3,
      };
      res.json({
        ...payload,
        token: jwt.encode(payload, authSecret),
      });
    } catch (msg) {
      return res.status(500).send(msg);
    }
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
    } catch (e) {}
    res.send(false);
  };

  return { signIn, validateToken };
};
