const asyncHandler = require("express-async-handler");
const Application = require("../models/applicationModel");

// add new application
// POST => /api/applications
// public
const createApplication = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    code,
    password,
    age,
    height,
    target,
    activityRate,
    preferredFood,
    unpreferredFood,
    duration,
    analysis,
    notes,
    photo,
    measurements,
    weightMethod,
  } = req.body;

  const application = await Application.create({
    name,
    phone,
    code,
    password,
    age,
    height,
    target,
    activityRate,
    preferredFood,
    unpreferredFood,
    duration,
    analysis,
    notes,
    photo,
    measurements,
    weightMethod,
  });

  if (application) {
    res.status(201).send("Application submitted");
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

// get all applications
// GET => /api/applications
// private "only admin"
const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find();
  if (!applications) {
    res.status(404);
    throw new Error("No applications found");
  }
  res.json(applications);
});

// get one application
// GET => /api/applications/:code
// private "only admin"
const getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOne({ code: req.params.code });
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }
  res.json(application);
});

// delete application
// DELETE => /applications/:code
// private "only admin"
const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOne({ code: req.params.code });
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }
  await Application.deleteOne({ code: req.params.code });
  res.status(201).send("Application deleted successfully");
});

module.exports = {
  createApplication,
  getAllApplications,
  getApplication,
  deleteApplication,
};
