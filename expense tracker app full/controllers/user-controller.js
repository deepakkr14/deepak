const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require('../models/user-model');

const secret="secretkey"
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

        jwt.sign({userId: user.id },secret,{expiresIn:'2h'},(err,token)=>{
          
             res.status(201).json({ message: "Login successful" ,token:token});
          
        })
       
       
      } else {
       
        res.status(401).json({ message: "Incorrect password ! User not authorized" });
      }
    } else {
     
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};
