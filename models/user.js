const mongoose = require("mongoose"),
    passportLocalmongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"
        }
    ]
});

userSchema.plugin(passportLocalmongoose);

module.exports = mongoose.model("User", userSchema)