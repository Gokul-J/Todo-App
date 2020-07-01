const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  Todo = require("./models/todo")

mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": "false" }));

// Todo.create({
//     text: "Brush"
// })

app.get("/", (req, res) => {
  Todo.find({}, (err, todo) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(todo);
    }
  })
})

app.get("/:id", (req,res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if(err){
      console.log(err);
    }
    else{
      res.json(todo);
    }
  })
})

app.post("/", (req, res) => {
  // console.log(req);
  const text = req.body.text;
  Todo.create({
    text: text
  }, (err, Todo) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(Todo);
    }
  })
})

app.delete("/", (req,res) => {
  // console.log(req);
  Todo.findByIdAndDelete(req.body.id, (err, todo) => {
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted");
      res.json(todo);
      console.log(todo);
    }
  })
})

app.listen(5000, () => {
  console.log("Server is Live on 5000");
})