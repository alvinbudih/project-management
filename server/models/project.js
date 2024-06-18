const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
})

const Project = model("Project", projectSchema);

module.exports = Project;