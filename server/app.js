require("dotenv").config();
require("./config/mongoose");
const express = require("express");
const cors = require("cors");
const project = require("./routes/project");
const errorHandler = require("./middlewares/errorHandler");
const task = require("./routes/task");
const app = express();
const port = process.env.PORT || 3000;

// untuk menangani cors
app.use(cors());
app.use(express.json()); // untuk parsing application/json
app.use(express.urlencoded({ extended: true })); // untuk parsing application/x-www-form-urlencoded

app.use("/projects", project);
app.use(task)

// untuk menangani error
app.use(errorHandler);

app.listen(port, () => {
  console.clear();
  console.log(`Example app listening on port ${port}`);
})