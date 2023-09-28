//imports packages
const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
//create the app
const app = express();
const PORT = process.env.PORT || 8000;
//access the static file
app.use(express.static("public"));
app.use("controller", express.static("controller/weatherController.js"));
app.set("views", "./public/views");
app.set("view engine", "ejs");

//get user urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//use the route
app.use("/api/", require("./routes/routes"));
//access the home page
app.use("/weatherForcast", require("./routes/routes"));
//access the port
app.listen(PORT, (req, res) => {
  console.log(`App Is Listening On PORT ${PORT}`);
});
