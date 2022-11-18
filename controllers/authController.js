const User = require("../models/User");
const Account = require("../models/Account");
const formidable = require("formidable");
const fs = require("fs");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const app = require("../app");
const mailer = require("./sendMail")
const uploadDir = __dirname + "/../public/images/uploads";
fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

const generateRandomUsername = () => {
    let username = "";
    for (let i = 0; i < 10; i++) {
        username += Math.floor(Math.random() * 10);
    }
    return username;
};

const generateRandomPassword = () => {
    let allAscii =
        "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    let password = "";
    for (let i = 0; i < 6; i++) {
        password += allAscii[Math.floor(Math.random() * allAscii.length)];
    }
    return password;
};

const authController = {
    getLoginPage: (req, res, next) => {
        res.render("login", { title: "Express", layout: "blankLayout" });
    },
    getRegisterPage: (req, res, next) => {
        res.render("register", { title: "Express", layout: "blankLayout" });
    },

    getSuccessRegister: (req, res) => {
        res.render("successRegister", { layout: "blankLayout" });
    },

    postRegisterPage: async(req, res) => {
        const username = generateRandomUsername();
        const password = generateRandomPassword();
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async(err, fields, files) => {
                if (err) {
                    req.session.flash = {
                        type: "danger",
                        info: "Oops!",
                        message: "There was an error processing your submission. \n Please try again.",
                    };
                    return res.render("error");
                }
                const { fullName, email, address, phoneNumber, dateOfBirth } = fields;

                const fontIdImage = files.fontIdImage;
                const backIdImage = files.backIdImage;

                const dir = uploadDir + "/" + username;
                const pathFontIdImage =
                    "/images/uploads/" +
                    username +
                    "/font." +
                    fontIdImage.originalFilename.split(".")[1];
                const pathBackIdImage =
                    "/images/uploads/" +
                    username +
                    "/back." +
                    backIdImage.originalFilename.split(".")[1];

                fs.mkdirSync(dir);
                fs.renameSync(
                    fontIdImage.filepath,
                    dir + "/font." + fontIdImage.originalFilename.split(".")[1]
                );
                fs.renameSync(
                    backIdImage.filepath,
                    dir + "/back." + backIdImage.originalFilename.split(".")[1]
                );

                let errorMess = {
                    isError: false,
                    errorE: false,
                    messageE: "",
                    errorPN: false,
                    messagePN: "",
                };

                User.findOne({ email: email }, (err, data) => {
                    if (data != null) {
                        errorMess.isError = true;
                        errorMess.errorE = true;
                        errorMess.messageE = "This email is already exist";
                        User.findOne({ phoneNumber: phoneNumber }, async(err, data) => {
                            if (data != null) {
                                errorMess.isError = true;
                                errorMess.errorPN = true;
                                errorMess.messagePN = "This phone number is already exist";
                            }
                            return res.render("register", {
                                layout: "blankLayout",
                                error: errorMess,
                                fullName,
                                address,
                                dateOfBirth,
                            });
                        });
                    } else {
                        User.findOne({ phoneNumber: phoneNumber }, async(err, data) => {
                            if (data != null) {
                                errorMess.isError = true;
                                errorMess.errorPN = true;
                                errorMess.messagePN = "This phone number is already exist";
                                return res.render("register", {
                                    layout: "blankLayout",
                                    error: errorMess,
                                    fullName,
                                    address,
                                    dateOfBirth,
                                });
                            } else {
                                const newUser = await User.create({
                                    username,
                                    fullName,
                                    email,
                                    address,
                                    phoneNumber,
                                    dateOfBirth,
                                    fontIdImage: pathFontIdImage,
                                    backIdImage: pathBackIdImage,
                                });
                                const newAccount = await Account.create({
                                    username,
                                    password,
                                    hashPassword: hashed,
                                });
                                res.redirect("/successRegister");
                            }
                        });
                    }
                });
            });
        } catch (error) {
            res.status(500).render("register", { error: error });
        }
    },

    generateAccessToken: (data) => {
        return jwt.sign({ data }, process.env.JWT_ACCESS_KEY, {
            expiresIn: "1h",
        });
    },

    generateRefreshToken: (data) => {
        return jwt.sign({ data }, process.env.JWT_REFRESH_KEY, {
            expiresIn: "10d",
        });
    },

    checkToken: async(req, res, next) => {
        if (!req.session.isLogin) {
            return next();
        }
        try {
            const account = await Account.findOne({
                username: req.session.username,
            });

            if (account) {
                const refreshToken = account.refreshToken;

                const verifyRefreshToken = jwt.verify(
                    refreshToken,
                    process.env.JWT_REFRESH_KEY
                );
                res.account = account;
                next();
            }
        } catch (error) {
            return res.json(error);
        }
    },

    refreshToken: async(req, res, next) => {
        if (!req.session.isLogin) {
            return next();
        }
        try {
            const accessToken = req.cookies.accessToken;
            const verifyAccessToken = jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_KEY
            );
            next();
        } catch (error) {
            const data = {
                username: res.account.username,
                admin: res.account.admin,
            };
            const newAccessToken = authController.generateAccessToken(data);
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            return res.redirect("/");
        }
    },

    getChangePasswordPage: (req, res) => {
        return res.render("changePassword", { layout: "blankLayout" });
    },

    postChangePasswordPage: async(req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.newPassword, salt);
            const account = await Account.findOne({
                username: req.session.username,
            });
            if (req.body.newPassword === req.body.confirmPassword) {
                await account.updateOne({
                    lastLogin: Date.now(),
                    hashPassword: hashed,
                });
                return res.redirect(303, "/");
            }
            return res.render("changePassword", {
                layout: "blankLayout",
                message: "Confirm password is incorrect",
            });
        } catch (error) {
            return res.json(error);
        }
    },

    postLoginPage: async(req, res) => {
        try {
            const account = await Account.findOne({
                username: req.body.username + "",
            });

            if (!account) {
                return res.status(400).render("login", {
                    layout: "blankLayout",
                    error: true,
                    message: "Wrong password or username",
                });
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                account.hashPassword
            );
            if (!validPassword) {
                console.log('SAI MK')
                return res.status(400).render("login", {

                    layout: "blankLayout",
                    error: true,
                    message: "Wrong password or username",
                });
            }
            if (account && validPassword) {
                const data = {
                    username: account.username,
                    admin: account.admin,
                };
                var accessToken = authController.generateAccessToken(data);
                var refreshToken = authController.generateRefreshToken(data);
                await account.updateOne({ refreshToken: refreshToken });

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                req.session.isLogin = true;
                req.session.username = account.username;
                if (!account.lastLogin) {
                    return res.redirect("/changePassword");
                }

                return res.redirect(303, "/");
            }
            res.status(500).json("error");
        } catch (error) {
            console.log(error.message)
            res.render("login", { layout: "blankLayout", error: error });
        }
    },

    getHomePage: async(req, res) => {
        if (!req.session.isLogin) {
            return res.redirect("/login");
        } else {
            const accessToken = req.cookies.accessToken;
            const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            const user = await User.findOne({ username: verifyToken.data.username });
            return res.render("index", {
                title: "SmartWallet",
                layout: "main",
                data: user,
            });
        }
    },

    logout: (req, res) => {
        req.session.isLogin = false;
        res.clearCookie("accessToken");
        res.redirect("/login");
    },

    getTestDisplay: (req, res) => {
        return res.render("test", {
            title: "SmartWallet",
            layout: "blankLayout"
        })
    },

    postTestDisplay: (req, res) => {
        return mailer.sendMail(req.body.input1, req.body.input2, req.body.input3)
    }
};

module.exports = authController;