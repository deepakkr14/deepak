const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const downloads = sequelize.define("downloads", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  date: { type: Sequelize.STRING },
  fileUrl: { type: Sequelize.STRING },
});
module.exports = downloads;
