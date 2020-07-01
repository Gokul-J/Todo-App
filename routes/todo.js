const express = require("express"),
    Router = express.Router(),
    Todo = require("../models/todo")

Router.get("/", (req, res) => {
    Todo.find({}, (err, todo) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(todo);
        }
    })
})

Router.get("/:id", (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(todo);
        }
    })
})

Router.post("/", (req, res) => {
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

Router.delete("/", (req, res) => {
    // console.log(req);
    Todo.findByIdAndDelete(req.body.id, (err, todo) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted");
            res.json(todo);
            console.log(todo);
        }
    })
})

module.exports = Router;