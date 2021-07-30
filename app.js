const express = require("express");
const mongoose = require("mongoose");
const dbfab = require("./config/db")
const dotenv = require('dotenv').config()
const userroute = require("./routes/userroutes")
const phoneroute = require("./routes/phoneroutes")

const app = express();

app.use(express.json());

app.use(express.static(__dirname));
app.use("/api/user/phone" , phoneroute)
app.use("/api/v1/user" , userroute)
dbfab()

port = process.env.PORT

app.listen(port, () => {
  console.log("Server is running...");
});