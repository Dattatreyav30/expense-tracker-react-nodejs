const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense_tracker_react_nodejs", "root" , "Mykoshi@3",{
    dialect : 'mysql',
    host : 'localhost'  
});


module.exports = sequelize;