const asyncHandler = require("express-async-handler");
const Plans = require("../models/planModel");

// create new plan
// POST => /api/plans
// private "only admin"
const createPlan = asyncHandler(async (req, res) => {
  const { duration, price, features } = req.body;
  const plan = await Plans.create({
    duration,
    price,
    features,
  });
  if (plan) {
    res.status(201).json({
      duration: plan.duration,
      price: plan.price,
      features: plan.features,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

// get all plans
// GET => /api/plans
// public
const getPlans = asyncHandler(async (req, res) => {
  const plans = await Plans.find();
  if (!plans) {
    res.status(404);
    throw new Error("no plans found");
  }
  res.json(plans);
});

// update plan
// PUT => /api/plans/:_id
// private "only admin"
const updatePlan = asyncHandler(async (req, res) => {
  const plan = await Plans.findById(req.params.id);
  if (plan) {
    plan.duration = req.body.duration || plan.duration;
    plan.price = req.body.price || plan.price;
    plan.features = req.body.features || plan.features;

    const updatedPlan = await plan.save();
    res.status(200).json({
      duration: updatedPlan.duration,
      price: updatedPlan.price,
      features: updatedPlan.features,
    });
  } else {
    res.status(404);
    throw new Error("Plan not found");
  }
});

// delete plan
// DELETE => /plans/:id
// private "only admin"
const deletePlan = asyncHandler(async (req, res) => {
  const plan = Plans.findById(req.params.id);
  if (plan) {
    await Plans.deleteOne({ _id: req.params.id });
    res.status(200).send("Deleted successfully");
  } else {
    res.status(404);
    throw new Error("plan not found");
  }
});

module.exports = { createPlan, getPlans, updatePlan, deletePlan };
