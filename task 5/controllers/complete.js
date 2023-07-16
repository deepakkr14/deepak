const path = require("path");
exports.adminget = (req, res) => {
  res.sendFile(
    path.join(path.join(__dirname), "..", "views/", "add-products.html")
  )
};

exports.adminpost = (req, res) => {
  console.log(req.body);
  res.redirect("/");
};

exports.shopget = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
};
exports.contactus = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "contactus.html"));
};

exports.succesp = (req, res) => {
  res.send("form succesfully filled");
};
