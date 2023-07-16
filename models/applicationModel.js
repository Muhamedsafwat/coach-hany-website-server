const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({ name: String });

const applicationSchema = mongoose.Schema({
  name: String,
  phone: String,
  code: String,
  password: String,
  age: String,
  height: String,
  target: String,
  activityRate: String,
  preferredFood: [foodSchema],
  unpreferredFood: [foodSchema],
  duration: String,
  analysis: String,
  notes: String,
});

//export schema
const Applications = mongoose.model("Applications", applicationSchema);
module.exports = Applications;
