const mongoose = require("mongoose"),
    passportLocalmongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalmongoose);

module.exports = mongoose.model("User", userSchema)