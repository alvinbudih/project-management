const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  startTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return new Date(v) < new Date(this.get("endTime"));
      },
      message: () => `Start Time must be less than End Time`
    }
  },
  endTime: {
    type: Date,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

const Task = model("Task", taskSchema)

module.exports = Task;