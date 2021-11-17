const mongoose = require('mongoose');
const subscriptionSchema = mongoose.Schema({
    subscribed_by: String,
    artist_id: String,
    name: String,
    stage_name: String
})
module.exports = mongoose.model("Subscription", subscriptionSchema);