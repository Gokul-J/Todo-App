const express = require("express"),
    Router = express.Router(),
    User = require("../models/user"),
    Passport = require("passport");

Router.post("/signup", (req,res) => {
    // console.log(req.body);
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err,user) => {
        if(err){
            res.send("failure");
            console.log(err);
        }
        else{
            Passport.authenticate("local")(req,res,() => {
                User.findOne({username: req.body.username}, (err, foundUser) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        data ={
                            username: req.body.username,
                            id: foundUser._id
                        }
                        res.send(data);
                    }
                })
            })
        }
    })
})

Router.post("/login",(req,res) => {
    Passport.authenticate("local")(req,res,() => {
        console.log("Logged In as", req.body.username);
        User.findOne({username: req.body.username}, (err, foundUser) => {
            if(err){
                console.log(err);
                console.log("Failure");
            }
            else{
                data ={
                    username: req.body.username,
                    id: foundUser._id
                }
                console.log(data);
                res.send(data);
            }
        })
})});

Router.post("/logout", (req,res) => {
    // req.logout();
    res.send("success");
})

module.exports = Router;