import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import "./TaskContainer.css";

const TaskContainer = ({ tasks, handleOpenUpdateTaskModal, setTask }) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  return (
    <div className="task-container">
      {tasks.map((task) => (
        <Card>
          <CardContent sx={{ padding: "10px 14px !important" }}>
            <div className="card-header-section">
              <Typography variant="h6" component="div">
                {task.title}
              </Typography>
              <IconButton
                onClick={() => {
                  handleOpenUpdateTaskModal();
                  setTask(task);
                }}
              >
                <EditIcon sx={{ fontSize: "18px" }} />
              </IconButton>
            </div>
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {task.description}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                marginTop: "4px",
              }}
              textAlign="end"
            >
              {formatDate(task.createdAt)}
            </Typography>
            {task.completedAt && (
              <Typography
                sx={{ color: "text.secondary", fontSize: "14px" }}
                textAlign="end"
              >
                {formatDate(task.completedAt)}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskContainer;
