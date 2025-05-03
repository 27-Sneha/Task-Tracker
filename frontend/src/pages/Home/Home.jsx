import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { data } from "react-router-dom";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import {
  createProject,
  createTask,
  deleteTask,
  getProjects,
  getTasks,
  updateTask,
} from "../../services/taskService";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import AddProjectModal from "../../components/AddProjectModal/AddProjectModal";
import UpdateTaskModal from "../../components/UpdateTaskModal/UpdateTaskModal";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const statusList = ["TODO", "IN PROGRESS", "COMPLETED"];

const Home = () => {
  const [projectList, setProjectList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openUpdateTaskModal, setOpenUpdateTaskModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [task, setTask] = useState({ title: "", description: "", status: "" });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    getProjectList();
  }, []);

  useEffect(() => {
    if (projectList.length > 0) {
      getTaskList(projectList[selectedProjectIndex]._id);
    }
  }, [selectedProjectIndex]);

  const getProjectList = async () => {
    try {
      const response = await getProjects();
      setProjectList(response.data);
      if (response.data.length === 0) return;
      await getTaskList(response.data[0]._id);
    } catch (error) {
      console.log("Error fetching project list:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const getTaskList = async (id) => {
    try {
      const response = await getTasks(id);
      console.log(response);
      setTaskList(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Add new project
  const handleOpenProjectModal = () => setOpenProjectModal(true);
  const handleCloseProjectModal = () => {
    setProjectName("");
    setOpenProjectModal(false);
  };

  const handleSubmitProject = async () => {
    try {
      const payload = {
        name: projectName,
      };
      await createProject(payload);
      await getProjectList();
      setSnackbar({
        open: true,
        message: "Project created successfully!!",
        severity: "success",
      });
    } catch (error) {
      console.log("Error creating project:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
    handleCloseProjectModal();
  };

  // Add new task
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => {
    setTask({ title: "", description: "", status: "" });
    setOpenTaskModal(false);
  };

  const handleSubmitTask = async () => {
    try {
      const payload = {
        project: projectList[selectedProjectIndex]._id,
        title: task.title,
        description: task.description,
        status: "todo",
        createdAt: new Date(),
      };
      await createTask(payload);
      await getTaskList(projectList[selectedProjectIndex]._id);
      setSnackbar({
        open: true,
        message: "Task created successfully!!",
        severity: "success",
      });
    } catch (error) {
      console.log("Error creating task:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
    handleCloseTaskModal();
  };

  // Update a task
  const handleOpenUpdateTaskModal = () => setOpenUpdateTaskModal(true);
  const handleCloseUpdateTaskModal = () => {
    setTask({ title: "", description: "", status: "" });
    setOpenUpdateTaskModal(false);
  };

  const handleSubmitUpdateTask = async () => {
    try {
      const payload = {
        project: projectList[selectedProjectIndex]._id,
        title: task.title,
        description: task.description,
        status: task.status.toLowerCase(),
      };
      if (task.status.toLowerCase() === "completed") {
        payload.completedAt = new Date();
      }

      await updateTask(payload, task._id);
      await getTaskList(projectList[selectedProjectIndex]._id);
      setSnackbar({
        open: true,
        message: "Task updated successfully!!",
        severity: "success",
      });
    } catch (error) {
      console.log("Error updating task:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
    handleCloseUpdateTaskModal();
  };

  // Delete a task
  const handleSubmitDeleteTask = async () => {
    try {
      await deleteTask(task._id);
      await getTaskList(projectList[selectedProjectIndex]._id);
      setSnackbar({
        open: true,
        message: "Task deleted successfully!!",
        severity: "success",
      });
    } catch (error) {
      console.log("Error deleting task:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
    setTask({ title: "", description: "", status: "" });
    handleCloseUpdateTaskModal();
  };

  console.log(task);

  return (
    <Grid container className="home-container">
      <Grid size={{ xs: 12 }}>
        <Navbar />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid container className="project-controls-container">
          <Grid size={{ xs: 5, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="project-select-label">Select Project</InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                value={selectedProjectIndex}
                label="Select Project"
                onChange={(e) =>
                  setSelectedProjectIndex(Number(e.target.value))
                }
                sx={{
                  "& .MuiSelect-select": {
                    padding: "10px 12px",
                  },
                }}
              >
                {projectList.map((project, index) => (
                  <MenuItem key={index} value={index}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              startIcon={<Add />}
              className="project-controls-btn"
              onClick={handleOpenProjectModal}
            >
              Project
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              startIcon={<Add />}
              className="project-controls-btn"
              onClick={handleOpenTaskModal}
            >
              Task
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={1} padding="0 20px">
          {statusList.map((status) => (
            <Grid size={{ xs: 12, sm: 4 }} className="task-list-container">
              <Typography>{status}</Typography>
              <TaskContainer
                tasks={taskList.filter(
                  (task) => task.status.toUpperCase() === status
                )}
                handleOpenUpdateTaskModal={handleOpenUpdateTaskModal}
                setTask={setTask}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <AddProjectModal
        open={openProjectModal}
        handleClose={handleCloseProjectModal}
        projectName={projectName}
        setProjectName={setProjectName}
        handleSubmit={handleSubmitProject}
      />
      <AddTaskModal
        open={openTaskModal}
        handleClose={handleCloseTaskModal}
        task={task}
        setTask={setTask}
        handleSubmit={handleSubmitTask}
      />
      <UpdateTaskModal
        open={openUpdateTaskModal}
        handleClose={handleCloseUpdateTaskModal}
        statusList={statusList}
        task={task}
        setTask={setTask}
        handleSubmitUpdateTask={handleSubmitUpdateTask}
        handleSubmitDeleteTask={handleSubmitDeleteTask}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Grid>
  );
};

export default Home;
