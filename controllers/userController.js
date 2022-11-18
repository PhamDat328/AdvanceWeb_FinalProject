const User = require("../models/User");
const formidable = require("formidable");
const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const salt = await bcrypt.genSalt(10);
// const hash = await bcrypt.hash(password, salt);

module.exports = {


    getDepositForm: async(req, res, next) => {

        if (!req.session.isLogin) {
            return res.redirect("/login");
        } else {
            const accessToken = req.cookies.accessToken;
            const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);

            return res.render("deposit", { title: "SmartWallet", layout: false });
        }

    },

    getWithdrawForm: (req, res, next) => {

        res.render("withdraw", { title: "SmartWallet", layout: false })

    },

    getTransferForm: (req, res, next) => {

        res.render("transfer", { title: "SmartWallet", layout: false })

    },

    getBuyPhoneCardForm: (req, res, next) => {

        res.render("buyphonecard", { title: "SmartWallet", layout: false })

    },
    getTransactionHistory: (req, res, next) => {

        res.render("transaction", { title: "SmartWallet", layout: false })

    },

    getEnterOTPForm: (req, res, next) => {
        res.render("enterOTP", { title: "SmartWallet", layout: "blankLayout" })
    }
}