const ProjectController = require("../controllers/project-controller");
const TaskController = require("../controllers/task-controller");

const project = require("express").Router();

project.post("/", ProjectController.create);

project.get("/", ProjectController.findAll);

project.get("/:id", ProjectController.findById);

project.put("/:id", ProjectController.update);

project.delete("/:id", ProjectController.destroy);

module.exports = project;