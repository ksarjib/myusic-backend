const mongoose = require("mongoose")

const artistSchema = mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
    songs : [{
        title : String,
        date: { type: Date, default: Date.now },
        fileName : String,
        description : String,
        category : [String]
        
    }],
})

module.exports = mongoose.model("Artist", artistSchema)