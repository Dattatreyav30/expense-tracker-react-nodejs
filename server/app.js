const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const cors = require('cors');

const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

const userRoute = require("./routes/userRoute");

app.use("/user", userRoute);

sequelize.sync().then(() => {
  console.log("synced");
});

app.listen(5000, () => {
  console.log("port running on 5000");
});
