const TaskController = require("../controller/tasks");

const routes = {
  create: "/new-task",
  readAll: "/tasks",
  readOne: "/task/:id",
  update: "/task/:id/",
  delete: "/task/:id",
};

module.exports = (app) => {
  app.get(routes.readAll, TaskController.readAllTasks());

  app.get(routes.readOne, TaskController.readOneTask());

  app.delete(routes.delete, TaskController.deleteTask());

  app.put(routes.update, TaskController.updateTask());

  app.post(routes.create, TaskController.createTask());
};
