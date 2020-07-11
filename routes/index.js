const express = require("express"),
    Router = express.Router(),
    User = require("../models/user"),
    Passport = require("passport");

Router.post("/signup", (req,res) => {
    // console.log(req.body);
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err,user) => {
        if(err){
            data= {
                message: "Username already Exist"
            }
            res.send(data);
            // console.log(err);
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
                            id: foundUser._id,
                            message: "Successfully Logged In"
                        }
                        res.send(data);
                    }
                })
            })
        }
    })
})

Router.post("/login",(req,res) => {
    Passport.authenticate("local", (err, user, info) => {
        if(err){console.log("AUTH"+err)}
        if(!user){
            console.log("USER FALSE")
            data = {
                message: "Invalid Username or Password"
            }
            return res.send(data);
        }
        req.logIn(user, err => {
            if(err){console.log("LOGIN"+err)}
            console.log("Success")
            data = {
                username: user.username,
                id: user._id,
                message: "Successfully Logged In"
            }
            return res.send(data);
        })
    })
    (req,res,() => {
        // console.log("Logged In as", req.body.username);
        // User.findOne({username: req.body.username}, (err, foundUser) => {
        //     if(err){
        //         console.log(err);
        //         console.log("Failure");
        //     }
        //     else{
        //         data ={
        //             username: req.body.username,
        //             id: foundUser._id
        //         }
        //         // console.log(data);
        //         res.send(data);
        //     }
        // })
    })
});

Router.post("/logout", (req,res) => {
    // console.log(req);
    req.logout();
    // console.log(req);
    // res.send("success");
    // console.log("Logged Out")
})

module.exports = Router;