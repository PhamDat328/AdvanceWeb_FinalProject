const mongoose = require("mongoose");

let Account = mongoose.Schema({

    ID: String,
    username: String,
    password: String,


})

module.exports = mongoose.model('Account', Account)