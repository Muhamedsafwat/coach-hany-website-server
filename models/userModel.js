const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const measurementSchema = mongoose.Schema({
  weight: String,
  neck: String,
  chest: String,
  arm: String,
  waist: String,
  hip: String,
  thigh: String,
  date: String,
});

const userSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  target: String,
  measurements: [measurementSchema],
});

//encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
});

//add method to compare passwords
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//export schema
const User = mongoose.model("User", userSchema);
module.exports = User;
