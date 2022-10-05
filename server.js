const express = require("express");
const app = express();
var path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
let connDB = require("./db");
const bcrypt = require("bcrypt");
/**
 * To get defined data from FORM we have to use {express.json} middleware
 */
app.use(express.json());

//TODO: app.set('views', path.join(__dirname, 'views'));
//TODO: app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/register", (req, res) => {
  res.render("index", { title: "Register" });
});

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid username or password" });
  } else {
    console.log("saving your info");
  }
  console.log(req.body);
  // return res.status(200).json({message:"Your account has been created"})

  /**
   * If user exists in database or the email matched with previous email
   * return error 400
   */
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    /**
     * if user does not exist in database, Create new user.
     * User is a model
     */

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    return res.status(201).json({ message: "New user created", user });
  } catch (e) {
    next(e);
  }
});

// mongoose.connect('mongodb://localhost:27017/testDB',{serverSelectionTimeoutMS:1000})
// .then(()=>{
//     console.log("Database connected seccesfully");
// }).catch((e)=>{
//     console.log(e);
// })

/**
 * Login section
 */

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "invalid username or password." });
    }
    let user = await User.findOne({ email });

    // if(email!=user.email){
    //   res.status(400).json({message:"user not found"})
    // }else{
    //   res.status(200).json({message: "login success"})
    // }

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const ismatched = await bcrypt.compare(password, user.password);
    if (!ismatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(user._doc);
    // delete user._doc.password
    return res.status(200).json({ message: "Login successful" });
  } catch (e) {
    next(e);
    console.log(e);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "server error occured" });
});

//TODO: Token generate//

/**
 * db connection
 */
connDB("mongodb://localhost:27017/testDB");

//db connection//

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
