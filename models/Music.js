const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    title : String,
    date : Date,
    fileName : String,
    description : String,
    artist_id : String
    
})
module.exports = mongoose.model("Music", musicSchema);