const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const forgotPass = sequelize.define("forgot-password", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = forgotPass;
