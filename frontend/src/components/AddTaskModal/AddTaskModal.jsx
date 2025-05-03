import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

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

const AddTaskModal = ({ open, handleClose, task, setTask, handleSubmit }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Add Task
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
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
