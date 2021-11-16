const mongoose = require('mongoose');
const subscriptionSchema = mongoose.Schema({
    subscribed_by : String,
    subscribed_to : {
        artise_id: String,
        name : String,
        stage_name: String
    }
    
    
})
module.exports = mongoose.model("Subscription", subscriptionSchema);