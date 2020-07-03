const express = require("express"),
    Router = express.Router(),
    Todo = require("../models/todo"),
    User = require("../models/user")

Router.get("/:username", (req, res) => {
    Todo.find({username: req.params.username}, (err, todo) => {
        // console.log(req.params);
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
    // console.log(req.body);
    const text = req.body.text;
    const username = req.body.username;
    Todo.create({
        text: text,
        username: username
    }, (err, todo) => {
        User.findOne({username: username}, (err, foundUser) => {
            if(err){
                console.log(err);
            }
            else{
                foundUser.todos.push(todo);
                foundUser.save((err, todo) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send(todo);
                    }
                })
            }
        })
    })
})

Router.delete("/", (req, res) => {
    // console.log(req);
    Todo.findByIdAndDelete(req.body.id, (err, todo) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log("Deleted");
            res.json(todo);
            // console.log(todo);
        }
    })
})

module.exports = Router;