const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var taskSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["todo", "in progress", "completed"],
    },
    createdAt: {
      type: Date,
      required: true,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
