const { user,authSecret } = require("../.env");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    if (user.username === payload.username) {
      done(null, user ? { ...payload } : false)
    } else {
      done("Token invalido", false)
    }
  });

  passport.use(strategy);
  return {
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
};
