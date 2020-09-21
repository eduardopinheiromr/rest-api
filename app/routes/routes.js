const db = require("../config/db");
const DatabaseAccess = require("../DAO/DatabaseAccess");
const databaseAccess = new DatabaseAccess(db);

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/tasks", (req, resp) => {
    databaseAccess
      .getAllTasks()
      .then((tasks) => resp.send(tasks))
      .catch((err) => console.log(err));
  });

  app.get("/task/:id", (req, resp) => {
    const id = req.params.id;
    databaseAccess
      .getTaskBy(id)
      .then((task) => resp.send(task))
      .catch((err) => console.log(err));
  });

  app.delete("/task/:id", (req, resp) => {
    const id = req.params.id;
    databaseAccess
      .deleteTaskBy(id)
      .then((task) => resp.send(task))
      .catch((err) => console.log(err));
  });

  app.put("/task/:id/", (req, resp) => {
    const id = req.params.id;
    const content = req.body;
    databaseAccess
      .editTaskBy(id, content)
      .then((task) => resp.send(task))
      .catch((err) => console.log(err));
  });

  app.post("/new-task", (req, resp) => {
    const content = req.body;
    databaseAccess
      .createTask(content)
      .then(resp.redirect("/"))
      .catch((err) => console.log(err));
  });
};
