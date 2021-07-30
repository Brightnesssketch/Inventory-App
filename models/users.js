
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const userSchema = Schema({
    avatar: {
    type: String
} ,
    firstName:{type: String, required:[true, "What's your firstname"]},
   lastName: {type: String, required:[true, "What's your firstname"]}, 
    email: { type: String, required:[true ,"Email field cannot be empty"]},
    password: {type:String, required:[true, "Input Password"]},
    accountCreated: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model("User", userSchema);


module.exports = User;