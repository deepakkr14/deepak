const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const secretKey = "secretkey";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
  
    const user = jwt.verify(token, secretKey);
    await User.findByPk(user.userId).then((user) => {
      // console.log(JSON.stringify(user));
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err + "   ye wala auth ka error hai");
    return res.status(401).json({ success: false });
  }
};

module.exports = authenticate;
