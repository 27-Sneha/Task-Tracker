const Project = require("../models/Project");
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
  const projectDocuments = await Project.find({ user: req.user.id });

  if (
    projectDocuments.filter((x) => x._doc.name === req.body.name).length >= 1
  ) {
    return res
      .status(400)
      .json({ message: "Project with same name not allowed!" });
  }
  if (projectDocuments.length >= 4)
    return res.status(400).json({ message: "Max 4 projects allowed!" });

  const project = await Project.create({
    name: req.body.name,
    user: req.user.id,
  });
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.status(200).json(projects);
};

exports.createTask = async (req, res) => {
  const taskDocuments = await Task.find({ project: req.body.project });

  if (
    taskDocuments.filter((x) => x._doc.title === req.body.title).length >= 1
  ) {
    return res
      .status(400)
      .json({ message: "Task with same title not allowed!" });
  }
  const task = await Task.create({ ...req.body });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
