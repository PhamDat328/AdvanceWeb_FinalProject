const mongoose = require("mongoose");

let Account = mongoose.Schema({
  username: String,
  password: String,
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
});

module.exports = mongoose.model("Account", Account);
