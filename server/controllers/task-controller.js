const CustomError = require("../helpers/CustomError");
const validateTaskDuration = require("../helpers/validateTaskDuration");
const Project = require("../models/project");
const Task = require("../models/task");

module.exports = class TaskController {
  static async create(req, res, next) {
    console.log("create task api...");

    try {
      const { params: { projectId }, body: { title, description, startTime, endTime } } = req;

      const project = await Project.findById(projectId);

      if (!project) {
        throw new CustomError("NotFoundError", "Project Not Found");
      }

      const result = new Task({ title, description, startTime, endTime, project: project.id });

      // validasi durasi task
      const condition = (await validateTaskDuration(project.id, startTime, endTime));

      // apabila tumpang tindih throw error
      if (!condition) {
        throw new CustomError("ValidationError", "Task Duration must not overlapping with other Task");
      }

      await result.save();

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    console.log("list task api...");

    try {
      const { params: { projectId } } = req;

      const project = await Project.findById(projectId);

      if (!project) {
        throw new CustomError("NotFoundError", "Project Not Found");
      }

      const tasks = await Task.find({ project: projectId });

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  static async findUnDone(req, res, next) {
    console.log("list undone task api...");

    try {
      const { params: { projectId } } = req;

      const project = await Project.findById(projectId);

      if (!project) {
        throw new CustomError("NotFoundError", "Project Not Found");
      }

      const tasks = await Task.find({ project: projectId, isDone: false });

      res.json(tasks)
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    console.log("update task api...");

    try {
      const { params: { id }, body: { title, description, startTime, endTime } } = req;

      const task = await Task.findById(id);

      if (!task) {
        throw new CustomError("NotFoundError", "Task Not Found");
      }

      task.title = title;
      task.description = description;
      task.startTime = startTime;
      task.endTime = endTime;

      // validasi durasi task
      const condition = (await validateTaskDuration(task.project, startTime, endTime, task.id));

      // jika durasinya tumpang tindih maka throw error
      if (!condition) {
        throw new CustomError("ValidationError", "Task Duration must not overlapping with other Task");
      }

      await task.save();

      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async updateTaskIsDone(req, res, next) {
    console.log("update is done task api...");

    try {
      const { params: { id } } = req;

      const task = await Task.findById(id);

      if (!task) {
        throw new CustomError("NotFoundError", "Task Not Found");
      }

      task.isDone = true;

      await task.save();

      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    console.log("delete task api...");

    try {
      const { params: { id } } = req;

      const result = await Task.findByIdAndDelete(id);

      if (!result) {
        throw new CustomError("NotFoundError", "Task Not Found");
      }

      res.json({ msg: `Task with id ${result.id} Deleted` });
    } catch (error) {

    }
  }
}