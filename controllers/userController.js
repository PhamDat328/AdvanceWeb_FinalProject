const User = require("../models/User");
const formidable = require("formidable");
// const bcrypt = require("bcrypt");
// const salt = await bcrypt.genSalt(10);
// const hash = await bcrypt.hash(password, salt);

module.exports = {

    getHomePage: (req, res, next) => {

        res.render("index", { title: "SmartWallet" })

    },

    getDepositForm: (req, res, next) => {

        res.render("Deposit", { title: "SmartWallet" })

    },

    getWithdrawForm: (req, res, next) => {

        res.render("Withdraw", { title: "SmartWallet" })

    },

    getTransferForm: (req, res, next) => {

        res.render("Transfer", { title: "SmartWallet" })

    },

    getBuyPhoneCardForm: (req, res, next) => {

        res.render("BuyPhoneCard", { title: "SmartWallet" })

    },
    getTransactionHistory: (req, res, next) => {

        res.render("index", { title: "SmartWallet" })

    }
}