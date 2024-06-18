const TaskController = require("../controllers/task-controller");

const task = require("express").Router();

task.post("/projects/:projectId/tasks", TaskController.create);

task.get("/projects/:projectId/tasks", TaskController.findAll)

task.get("/projects/:projectId/tasks/undone", TaskController.findUnDone)

task.put("/tasks/:id", TaskController.update);

task.patch("/tasks/:id", TaskController.updateTaskIsDone);

task.delete("/tasks/:id", TaskController.destroy);

module.exports = task;