const mongoose = require("mongoose");

let User = mongoose.Schema({

    ID: String,
    Fullname: String,
    DatofBirth: Date,
    PhoneNumber: String,
    Email: String,
    Address: String,

})

module.exports = mongoose.model('User', User)