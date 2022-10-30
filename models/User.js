const { Schema, model } = require("mongoose");

//TODO: add user properties and validation according to assignment
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [2, "Username must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: true,
    minlength: [10, "Email must be at least 10 characters long"],
  },
  hashedPassword: { type: String, required: true },
});

const User = model("User", userSchema);

module.exports = User;
