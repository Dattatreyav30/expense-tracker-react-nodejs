const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");

const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const userRoute = require("./routes/userRoute");
const userDetailsRoute = require("./routes/userDetailsRoute");
const expenseRoute = require('./routes/expenseRoute');

app.use("/user", userRoute);
app.use(userDetailsRoute);
app.use('/expenses',expenseRoute)

const User = require("./models/userModel");
const UserDeatils = require("./models/userDetailsModel");
const forgotPass = require('./models/forgotPassModel');
const expenses = require("./models/expenseModel")

User.hasMany(UserDeatils);
UserDeatils.belongsTo(User);  

User.hasMany(forgotPass);
forgotPass.belongsTo(User);

User.hasMany(expenses);
expenses.belongsTo(User)   

sequelize.sync().then(() => {  
  console.log("synced"); 
});

app.listen(5000, () => {
  console.log("port running on 5000");
});
