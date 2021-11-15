const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    song_id : String,
    rating : Number,
    rated_by : String
    
    
})
module.exports = mongoose.model("Rating", ratingSchema);