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
            let user = await User.findOne({ username: verifyToken.data.username });
            return res.render("deposit", {
                title: "SmartWallet",
                layout: "main",
                user,
                depositButton: true
            });

        }
    },

    getWithdrawForm: async(req, res, next) => {

        if (!req.session.isLogin) {
            return res.redirect("/login");
        } else {

            const accessToken = req.cookies.accessToken;
            const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            let user = await User.findOne({ username: verifyToken.data.username });
            return res.render("withdraw", {
                title: "SmartWallet",
                layout: "main",
                user,
                withdrawButton: true
            });

        }

    },

    getTransferForm: async(req, res, next) => {

        if (!req.session.isLogin) {
            return res.redirect("/login");
        } else {

            const accessToken = req.cookies.accessToken;
            const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            let user = await User.findOne({ username: verifyToken.data.username });
            return res.render("transfer", {
                title: "SmartWallet",
                layout: "main",
                user,
                transferButton: true
            });

        }

    },

    getBuyPhoneCardForm: async(req, res, next) => {

        if (!req.session.isLogin) {
            return res.redirect("/login");
        } else {

            const accessToken = req.cookies.accessToken;
            const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            let user = await User.findOne({ username: verifyToken.data.username });
            return res.render("buyphonecard", {
                title: "SmartWallet",
                layout: "main",
                user,
                buyButton: true
            });

        }

    },
    getTransactionHistory: async(req, res, next) => {

        if (!req.session.isLogin) {
            return res.redirect("/login");
        } else {

            const accessToken = req.cookies.accessToken;
            const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            let user = await User.findOne({ username: verifyToken.data.username });
            return res.render("transaction", {
                title: "SmartWallet",
                layout: "main",
                user,
                transactionButton: true
            });

        }

    },

    getEnterOTPForm: (req, res, next) => {
        res.render("enterOTP", { title: "SmartWallet", layout: "blankLayout" })
    }
}