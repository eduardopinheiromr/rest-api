const db = require("../config/db");
const DatabaseAccess = require("../DAO/DatabaseAccess");
const databaseAccess = new DatabaseAccess(db);

class TaskController {
  static createTask() {
    return (req, resp) => {
      const content = req.body;
      databaseAccess
        .createTask(content)
        .then(resp.redirect("/"))
        .catch((err) => console.log(err));
    };
  }

  static readAllTasks() {
    return (req, resp) => {
      databaseAccess
        .getAllTasks()
        .then((tasks) => resp.send(tasks))
        .catch((err) => console.log(err));
    };
  }

  static readOneTask() {
    return (req, resp) => {
      const id = req.params.id;
      databaseAccess
        .getTaskBy(id)
        .then((task) => resp.send(task))
        .catch((err) => console.log(err));
    };
  }

  static deleteTask() {
    return (req, resp) => {
      const id = req.params.id;
      databaseAccess
        .deleteTaskBy(id)
        .then((task) => resp.send(task))
        .catch((err) => console.log(err));
    };
  }

  static updateTask() {
    return (req, resp) => {
      const id = req.params.id;
      const content = req.body;
      databaseAccess
        .editTaskBy(id, content)
        .then((task) => resp.send(task))
        .catch((err) => console.log(err));
    };
  }
}

module.exports = TaskController;
