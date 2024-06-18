const CustomError = require("../helpers/CustomError");
const Project = require("../models/project");
const Task = require("../models/task");

module.exports = class ProjectController {
  static async create(req, res, next) {
    console.log("create project api...");

    try {
      const { body: { name, description } } = req;

      const result = await Project.create({ name, description });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    console.log("list project api...");

    try {
      const projects = await Project.find();

      res.json(projects);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    console.log("get project api...");

    try {
      const { params: { id } } = req;

      const project = await Project.findById(id);

      if (!project) {
        throw new CustomError("NotFoundError", "Project Not Found");
      }

      res.json(project);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    console.log("update project api...");

    try {
      const { params: { id }, body: { name, description } } = req;

      const project = await Project.findById(id);

      if (!project) {
        throw new CustomError("NotFoundError", "Project Not Found");
      }

      project.name = name;
      project.description = description;

      await project.save();

      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    console.log("delete project api...");

    try {
      const { params: { id } } = req;

      await Task.deleteMany({ project: id });

      const result = await Project.findByIdAndDelete(id);

      if (!result) {
        throw new CustomError("NotFoundError", "Project Not Found");
      }

      res.json({ msg: `Project with id ${result.id} Deleted` });
    } catch (error) {
      next(error);
    }
  }
}