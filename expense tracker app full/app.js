const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");

const sequelize = require("./util/database");



const app = express();
const dotenv = require('dotenv');

require('dotenv').config({ path: './config.env' });
app.use(cors());

app.use(express.json());

const Uroutes = require("./routes/user-routes");
const Eroutes = require("./routes/expense-routes");
const Purchaseroutes=require("./routes/purchase-routes")

const Expense = require("./models/expense-model");
const User = require("./models/user-model");
const Order=require("./models/order-model");
// const { default: orders } = require("razorpay/dist/types/orders");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(Uroutes);
app.use(Eroutes);
app.use(Purchaseroutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


sequelize
  // .sync({force:true})
  //  .sync({alter:true})
  .sync()
  .then((result) => {
    console.log("server started");

    app.listen(3005);
  })
  .catch((err) => console.log(err));
