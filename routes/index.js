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
                res.send(req.body.username);
            })
        }
    })
})

Router.post("/login",(req,res) => {
    // console.log(req.user);
    Passport.authenticate("local")(req,res,() => {
        console.log("Logged In as", req.body.username);
        res.send(req.body.username);
})});

Router.post("/logout", (req,res) => {
    // req.logout();
    res.send("success");
})

module.exports = Router;