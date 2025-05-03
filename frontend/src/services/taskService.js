import {
  createProjectUrl,
  createTaskUrl,
  deleteTaskUrl,
  getProjectsUrl,
  getTasksUrl,
  updateTaskUrl,
} from "../constants/urls";
import apiCaller from "./apiCaller";

const getAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProjects = async () => {
  return await apiCaller.get(getProjectsUrl, getAuthorizationHeader());
};

export const createProject = async (creteProjectPayload) => {
  return await apiCaller.post(
    createProjectUrl,
    creteProjectPayload,
    getAuthorizationHeader()
  );
};

export const getTasks = async (projectId) => {
  return await apiCaller.get(
    getTasksUrl.replace(":projectId", projectId),
    getAuthorizationHeader()
  );
};

export const createTask = async (creteTaskPayload) => {
  return await apiCaller.post(
    createTaskUrl,
    creteTaskPayload,
    getAuthorizationHeader()
  );
};

export const updateTask = async (updateTaskPayload, taskId) => {
  return await apiCaller.put(
    updateTaskUrl.replace(":id", taskId),
    updateTaskPayload,
    getAuthorizationHeader()
  );
};

export const deleteTask = async (taskId) => {
  return await apiCaller.delete(
    deleteTaskUrl.replace(":id", taskId),
    getAuthorizationHeader()
  );
};
