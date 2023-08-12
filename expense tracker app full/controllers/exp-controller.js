const Users = require("../models/expenses-model");

exports.postaddNew = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body);

  Users.findAll({
    where: {
      email: email,
    },
  }).then((result) => {
    if (result.length > 0) {
      res.json(result);
    } else {
      Users.create({
        name,
        email,
        password,
      })
        .then((result) => {
          console.log("user Created");
          res.status(200).json();
        })
        .catch((err) => console.log(err));
    }
  });
};

exports.postlogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ where: { email: email } })

    .then((user) => {
      if (!user) {
        // User not found
        res.status(404).json({ message: "User not found" });
      } else if (user.password === password) {
        //   // Correct password, login successful
        res.status(200).json({ message: "Login successful" });
      } else {
        // //   // Incorrect password, user not authorized
        res.status(401).json({ message: "User not authorized" });
      }
    })
    .catch((err) => console.log(err));
};
