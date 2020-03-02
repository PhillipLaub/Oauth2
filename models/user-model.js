const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define model
const userSchema = new Schema({
    username: String,
    linkedinId: String,
    thumbnail: String
})

//create user collection
const User = mongoose.model('user', userSchema)

module.exports = User;