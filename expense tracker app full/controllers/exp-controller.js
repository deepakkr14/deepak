const bcrypt = require("bcryptjs/dist/bcrypt");
const Users = require("../models/expenses-model");
const hash = require("bcryptjs");

exports.postaddNew = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await Users.findAll({
      where: {
        email: email,
      },
    });

    if (result.length > 0) {
      res.json(result);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await Users.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json();
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "An error occurred while creating user" });
  }
};

exports.postlogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await Users.findOne({ where: { email: email } });

    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        // Correct password, login successful
        res.status(200).json({ message: "Login successful" });
      } else {
        // Incorrect password, user not authorized
        res.status(401).json({ message: "User not authorized" });
      }
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};
