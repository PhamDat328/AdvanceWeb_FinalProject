const User = require("../models/User");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

const adminController = {
  getPending: async (req, res) => {
    const pendingAccounts = await Account.find({ status: "pending" });
    let pendingUsers = [];
    const accessToken = req.cookies.accessToken;
    const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    const user = await User.findOne({ username: verifyToken.data.username });
    for (let item of pendingAccounts) {
      pendingUsers.push(await User.findOne({ username: item.username }).lean());
    }
    return res.render("pending", {
      layout: "admin",
      user,
      pendingUsers,
    });
  },
  getActive: async (req, res) => {
    const activeAccounts = await Account.find({ status: "active" });
    let activeUsers = [];
    const accessToken = req.cookies.accessToken;
    const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    const user = await User.findOne({ username: verifyToken.data.username });
    for (let item of activeAccounts) {
      activeUsers.push(await User.findOne({ username: item.username }).lean());
    }
    return res.render("activated", {
      layout: "admin",
      user,
      activeUsers,
    });
  },
  getDisabled: async (req, res) => {
    const disableAccounts = await Account.find({ status: "disable" });
    let disabledUsers = [];
    const accessToken = req.cookies.accessToken;
    const verifyToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    const user = await User.findOne({ username: verifyToken.data.username });
    for (let item of disableAccounts) {
      disabledUsers.push(
        await User.findOne({ username: item.username }).lean()
      );
    }
    return res.render("disabled", {
      layout: "admin",
      user,
      disabledUsers,
    });
  },

  activated: async (req, res) => {
    try {
      const account = await Account.findOne({ username: req.params.username });
      if (account) {
        await account.updateOne({ status: "active" });
      }
      return res.redirect("/admin/pending");
    } catch (error) {
      console.log(error);
      return res.render("404", { layout: "blankLayout" });
    }
  },
  disabled: async (req, res) => {
    try {
      const account = await Account.findOne({ username: req.params.username });
      if (account) {
        await account.updateOne({ status: "disabled" });
      }
      return res.redirect("/admin/pending");
    } catch (error) {
      console.log(error);
      return res.render("404", { layout: "blankLayout" });
    }
  },
  addInfo: async (req, res) => {
    try {
      const account = await Account.findOne({ username: req.params.username });
      if (account) {
        await account.updateOne({ status: "waiting update" });
      }
      return res.redirect("/admin/pending");
    } catch (error) {
      console.log(error);
      return res.render("404", { layout: "blankLayout" });
    }
  },

  getUserDetail: async (req, res) => {
    const user = await User.findOne({ username: req.params.username }).lean();
    const account = await Account.findOne({
      username: req.params.username,
    })
      .lean()
      .select("balance status history username");
    console.log(account);
  },
};

module.exports = adminController;
