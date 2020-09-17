const app = require("./app/config/custom-express");

// MIDDLEWARES
const middlewares = require("./app/config/middlewares");
middlewares(app);

// ROUTES
const routes = require("./app/routes/routes");
routes(app);

// LOAD SERVER
const port = 8080;

app.listen(port, () => {
  console.log(
    "\nServidor iniciado em http://localhost:" + port + "\n\n\n\n\n\n"
  );
});
