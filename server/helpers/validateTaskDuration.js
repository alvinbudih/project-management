const Task = require("../models/task")

module.exports = async function validateTaskDuration(projectId, startTime, endTime, taskId) {
  startTime = new Date(startTime);
  endTime = new Date(endTime);

  // cari task berdasarkan projectId
  const tasks = await Task.find({ project: projectId });

  return !tasks.some(task => {
    const taskStartTime = new Date(task.startTime);
    const taskEndTime = new Date(task.endTime);

    // jika ini adalah yang task di update maka jangan dianggap
    if (!!taskId && taskId === task.id) {
      return false;
    }

    return (startTime > taskStartTime && startTime < taskEndTime) || (endTime > taskStartTime && endTime < taskEndTime);
  })
}