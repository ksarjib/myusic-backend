const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    gender: Number,
    username: String,
    password: String,
    category: Number,
    dob: Date,
    status: Number
});
module.exports = mongoose.model("User", UserSchema);