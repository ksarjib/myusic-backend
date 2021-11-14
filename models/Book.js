const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
})

module.exports = mongoose.model("Book", schema)