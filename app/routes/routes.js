const db = require("../config/db");
const DatabaseAccess = require("../DAO/DatabaseAccess");
const databaseAccess = new DatabaseAccess(db);

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/tarefas", (req, resp) => {
    databaseAccess
      .getAllTasks()
      .then((tasks) => resp.send(tasks))
      .catch((err) => console.log(err));
  });

  app.get("/tarefas/:id", (req, resp) => {
    const id = req.params.id;
    databaseAccess
      .getTaskBy(id)
      .then((task) => resp.send(task))
      .catch((err) => console.log(err));
  });

  app.delete("/tarefas/:id", (req, resp) => {
    const id = req.params.id;
    databaseAccess
      .deleteTaskBy(id)
      .then((task) => resp.send(task))
      .catch((err) => console.log(err));
  });

  app.put("/tarefas/:id/", (req, resp) => {
    const id = req.params.id;
    const content = req.body;
    databaseAccess
      .editTaskBy(id, content)
      .then((task) => resp.send(task))
      .catch((err) => console.log(err));
  });

  app.post("/nova-tarefa", (req, resp) => {
    const content = req.body;
    databaseAccess
      .createTask(content)
      .then((task) => resp.send(task))
      .catch((err) => console.log(err));
  });
};
