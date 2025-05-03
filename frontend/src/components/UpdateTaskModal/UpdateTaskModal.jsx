import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UpdateTaskModal = ({
  open,
  handleClose,
  statusList,
  task,
  setTask,
  handleSubmitUpdateTask,
  handleSubmitDeleteTask,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Update Task
        </Typography>

        <TextField
          label="Title"
          fullWidth
          value={task.title}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, title: e.target.value }))
          }
          margin="normal"
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={task.description}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={task.status.toUpperCase()}
            label="Status"
            onChange={(e) =>
              setTask((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            {statusList.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitUpdateTask}
          sx={{ mt: 2, mr: 1 }}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleSubmitDeleteTask}
          sx={{ mt: 2 }}
        >
          Delete
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateTaskModal;
