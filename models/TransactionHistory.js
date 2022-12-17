const mongoose = require("mongoose");

let Transaction = mongoose.Schema({

    userID: String,
    transactionType: {
        type: String,
        require: true,
    },
    transactionDate: {
        type: Date,
        require: true
    },
    transactionAmount: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    describe: {
        type: String,
        default: ""
    },
    note:{
        type: String,
        default: ""
    },
    receiver: {
        type: String,
        default: ""
    },
    transactionFee: {
        type: Number,
        default: 0
    },
    feeBearer: {
        type: Number,
        default: 0

    },
    beenReaded: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Transaction", Transaction);