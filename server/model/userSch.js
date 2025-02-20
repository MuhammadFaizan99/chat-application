const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    ConfirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel =  mongoose.model("users",userSchema); 
module.exports = {userModel}
