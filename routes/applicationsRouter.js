const express = require("express");
const router = express.Router();

const {
  createApplication,
  getAllApplications,
  getApplication,
  deleteApplication,
} = require("../controllers/applicationsController");
const protect = require("../middleware/routeProtection");

//add new application "public"
router.post("/", createApplication);
//get all applications "only admin"
router.get("/", protect("admin"), getAllApplications);
//get one application "only admin"
router.get("/:code", protect("admin"), getApplication);
//delete application "only admin"
router.delete("/:code", protect("admin"), deleteApplication);

module.exports = router;
