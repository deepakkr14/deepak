const path = require("path");
const fs=require("fs")
const Port=process.env.PORT
const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const uuid=require("uuid")

const sequelize = require("./util/database");

const helmet= require("helmet")
const morgan= require("morgan")
const app = express();
const dotenv = require("dotenv");

const accessLogStream=fs.createWriteStream(path.join(__dirname,'accessLog'),{flags:"a"})
require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(helmet());
app.use(morgan("combined",{stream:accessLogStream}));
app.use(express.json());

const Uroutes = require("./routes/user-routes");
const Eroutes = require("./routes/expense-routes");
const Purchaseroutes = require("./routes/purchase-routes");
const forgetPasswordRoutes = require("./routes/password-routes");

const Expense = require("./models/expense-model");
const User = require("./models/user-model");
const Order = require("./models/order-model");
const Password = require("./models/password-model");
const Download=require("./models/downloads-model");
const { Stream } = require("stream");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(Uroutes);
app.use(Eroutes);
app.use(Purchaseroutes);
app.use(forgetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Password);
Password.belongsTo(User);

User.hasMany(Download);
Download.belongsTo(User)
sequelize
  // .sync({force:true})
  //  .sync({alter:true})
  .sync()
  .then((result) => {
    console.log("server started on "+ process.env.PORT);

    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
