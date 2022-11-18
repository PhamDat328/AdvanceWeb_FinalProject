const app = require("../app");
const adminController = {
  getPending: (req, res) => {
    return res.render("pending", { layout: "admin" });
  },
};

module.exports = adminController;
