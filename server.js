const express = require("express");
const app = express();
var path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
let connDB = require("./db");
const authenticate=require('./middleware/authenticate')
const {registerRoute,loginRoute} = require('./controller/auth')
const routes= require('./routes/index')

/**
 * To get defined data from FORM we have to use {express.json} middleware
 */
app.use(express.json());

//  app.set('views', path.join(__dirname, 'views'));
//  app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  res.send("Hello world!");
});

/**
 * Login section
 */
app.use(routes)

app.get('/private',authenticate,async (req, res)=> {
  console.log("I am the user", req.user);
  return res.status(200).json({message: "i am a private route."})
})

/**
 * db connection
 */
connDB("mongodb://localhost:27017/testDB");

//server running section//

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
