const mongoose = require("mongoose");

const measurementSchema = mongoose.Schema({
  weight: String,
  neck: String,
  chest: String,
  arm: String,
  waist: String,
  hip: String,
  thigh: String,
});

const applicationSchema = mongoose.Schema({
  name: String,
  phone: String,
  code: String,
  password: String,
  age: String,
  height: String,
  target: String,
  activityRate: String,
  preferredFood: String,
  unpreferredFood: String,
  duration: String,
  analysis: String,
  photo: String,
  notes: String,
  measurements: measurementSchema,
  weightMethod: String,
});

//export schema
const Applications = mongoose.model("Applications", applicationSchema);
module.exports = Applications;
