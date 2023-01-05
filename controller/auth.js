const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {registerService,loginservice}=require('../service/auth')

async function registerRoute(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid username or password" });
  } else {
    console.log("saving your info");
  }
  /**
   * If user exists in database or the email matched with previous email
   * return error 400
   */
  try {
    let user = await registerService({ name,email,password });
    if (user) {
      return res.status(201).json({ message: "user successfully created" });
    }

    /**
     * if user does not exist in database, Create new user.
     ** User is a model
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
}

async function loginRoute(req, res, next) {
  const { email, password } = req.body;
  try {
    let token = await loginservice({ email,password });
    return res.status(200).json({message: "login successful.",token});
    // if (!email || !password) {
    //   res.status(400).json({ message: "invalid username or password." });
    // }
    // if (!user) {
    //   return res.status(400).json({ message: "user not found" });
    //}

    // const ismatched = await bcrypt.compare(password, user.password);
    // if (!ismatched) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }
    // console.log(user._doc);
    // delete user._doc.password
    //*!Token generate//
    // const token = jwt.sign(user._doc, "secret-key", { expiresIn: "30s" });
    // return res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    next(e);
    console.log("There is a error in login");
  }
}
module.exports = { registerRoute, loginRoute };
