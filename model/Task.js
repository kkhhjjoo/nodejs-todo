const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskScheme = Schema({
  task: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true
  }
})

const Task = mongoose.model("Task", taskScheme);

module.exports = Task;