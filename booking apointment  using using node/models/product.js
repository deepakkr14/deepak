const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Users = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  phone: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});

module.exports = Users;
