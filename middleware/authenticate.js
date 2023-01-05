const jwt = require("jsonwebtoken");
const User = require("../models/user");
async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Invalid authorization" });
    }
    
    //* Spliting the first word (bearer) of token genereted//
    token = token.split(" ")[0];
    
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findOne(decoded._id);
    
    //! Checking if the req user is matching with user in Model//
    req.user = user;
    next();
    console.log(user);
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = authenticate;
