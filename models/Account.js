const mongoose = require("mongoose");

let Account = mongoose.Schema({
    username: String,
    password: String,
    hashPassword: String,

    lockedTimes: {
        type: Number,
        default: 0,
    },
    abnormalLogin: {
        type: Number,
        default: 0,
    },
    lockTo: {
        type: Date,
        default: "",
    },
    status: {
        type: String,
        default: "pending",
    },
    balance: {
        type: Number,
        default: 500000,
    },
    history: {
        type: [],
        default: [],
    },
    refreshToken: {
        type: String,
        default: "",
    },
    admin: {
        type: Boolean,
        default: false,
        select: false,
    },
    lastLogin: {
        type: Date,
        default: "",
    },
    remainWithDrawPerDay: {
        type: Number,
        default: 2
    }
});

module.exports = mongoose.model("Account", Account);