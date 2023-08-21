const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const password = sequelize.define("password", {
  id: {
    type: Sequelize.UUID,
    allowNull:false,
    primaryKey : true
  },
  // userId: { type: Sequelize.STRING },
  isActive: { type: Sequelize.BOOLEAN ,
  defaultValue: false },
});
module.exports = password;
