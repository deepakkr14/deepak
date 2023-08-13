const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");

const sequelize = require("./util/database");

const app = express();

app.use(cors());

app.use(express.json());

const Uroutes = require("./routes/user-routes");
const Eroutes = require("./routes/expense-routes");
const Expense = require("./models/expense-model");
const User = require("./models/user-model");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(Uroutes);
app.use(Eroutes);

User.hasMany(Expense);
Expense.belongsTo(User)

sequelize
  // .sync({force:true})
  .sync()
  .then((result) => {
    console.log("server started");

    app.listen(3005);
  })
  .catch((err) => console.log(err));
