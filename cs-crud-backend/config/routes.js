const admin = require("./admin");

module.exports = (app) => {
  app.post("/signin", app.api.auth.signIn);
  app.post("/validateToken", app.api.auth.validateToken);

  app
    .route("/clients")
    .all(app.config.passport.authenticate())
    .get(app.api.client.get)
    .post(admin(app.api.client.save));

  app
    .route("/client/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.client.getById)
    .put(admin(app.api.client.save))
    .delete(admin(app.api.client.remove));

  app.route("/user").get(app.api.user.get);
};
