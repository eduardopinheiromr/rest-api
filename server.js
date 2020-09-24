const app = require("./app/config/custom-express");

// MIDDLEWARES
const middlewares = require("./app/config/middlewares");
middlewares(app);

// ROUTES
const routes = require("./app/routes/routes");
routes(app);

// LOAD SERVER
app.set("port", process.env.PORT || 3000);

// app.listen(port, () => {
//   const time = new Date();
//   console.log(
//     `\nServidor iniciado em http://localhost:${port}\n\n
//     Iniciado em: ${time}\n\n\n\n`
//   );
// });
