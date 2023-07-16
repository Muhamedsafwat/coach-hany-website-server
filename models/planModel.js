const mongoose = require("mongoose");

const featureSchema = mongoose.Schema({ details: String });

const planSchema = mongoose.Schema({
  duration: String,
  price: String,
  features: [featureSchema],
});

//export schema
const Plans = mongoose.model("Plans", planSchema);
module.exports = Plans;
