const { model, Schema } = require("mongoose");
const userSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      messages: (prop) => `Invalid Email: ${prop.value}`,   
    },
  },
  password: {
    type: String,
    minlength: [6, "password is too short"],
    required: true,
  },
  // roles: {
  //   type: String,
  //   required: true,
  //   default: ["STUDENT"],
  // },
  accountStatus: {
    type: String,
    enum: ["ACTIVE", "PENDING", "REJECTED"],
    default: "ACTIVE",
    required: true,
  },
});
const User = model("User", userSchema);
module.exports = User;
