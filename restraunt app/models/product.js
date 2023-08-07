const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Users = sequelize.define("Orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  item: Sequelize.STRING,
  price: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  table: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});

module.exports = Users;
