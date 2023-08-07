const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");
const app = express();
app.use(cors());
app.use(express.json());

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);

sequelize
  .sync()
  .then((result) => {
    console.log("server started");

    app.listen(3002);
  })
  .catch((err) => console.log(err));
