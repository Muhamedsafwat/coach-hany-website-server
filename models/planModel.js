const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  duration: String,
  price: String,
  insteadOf: String,
  features: [String],
});

//export schema
const Plans = mongoose.model("Plans", planSchema);
module.exports = Plans;
