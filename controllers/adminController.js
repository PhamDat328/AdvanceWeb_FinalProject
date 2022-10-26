module.exports = {
  getPending: (req, res) => {
    return res.render("pending", { layout: "admin" });
  },
};
