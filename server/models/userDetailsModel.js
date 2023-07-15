const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const userDeatils = sequelize.define("userDetails", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});
module.exports = userDeatils;
