const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createProject,
  getProjects,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/project", auth, createProject);
router.get("/projects", auth, getProjects);
router.post("/task", auth, createTask);
router.get("/:projectId/tasks", auth, getTasks);
router.put("/task/:id", auth, updateTask);
router.delete("/task/:id", auth, deleteTask);

module.exports = router;
