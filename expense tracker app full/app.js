const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const sequelize = require("./util/database");

const app = express();

app.use(cors());

app.use(express.json());

const Routes = require("./routes/user-routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(Routes);

sequelize
  // .sync({force:true})
  .sync()
  .then((result) => {
    console.log("server started");

    app.listen(3005);
  })
  .catch((err) => console.log(err));
