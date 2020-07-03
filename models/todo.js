const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: String,
    username: String
})

module.exports = mongoose.model("Todo", todoSchema);