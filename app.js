const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  todoRoutes = require("./routes/todo");

mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": "false" }));

app.use(todoRoutes);

app.listen(5000, () => {
  console.log("Server is Live on 5000");
})