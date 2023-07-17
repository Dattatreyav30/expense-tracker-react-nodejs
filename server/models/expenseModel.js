const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const expenseModal = sequelize.define("expenses", {
  id: {
    type: Sequelize.STRING,
    primaryKey : true,
    allowNull: false,
  },
  money: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },   
  description: {
    type: Sequelize.STRING,   
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = expenseModal;
