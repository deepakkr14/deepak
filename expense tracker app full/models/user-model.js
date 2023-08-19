const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type:Sequelize.STRING,
  allowNull:false},
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalExpense: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ispremiumuser:{
    type : Sequelize.BOOLEAN ,
    defaultValue :false
  }
});

module.exports = User;
