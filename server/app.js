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

app.use("/user", userRoute);
app.use(userDetailsRoute);

const User = require("./models/userModel");
const UserDeatils = require("./models/userDetailsModel");

User.hasMany(UserDeatils);
UserDeatils.belongsTo(User);  

sequelize.sync().then(() => {
  console.log("synced");
});

app.listen(5000, () => {
  console.log("port running on 5000");
});
