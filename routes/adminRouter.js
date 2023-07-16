const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin } = require("../controllers/adminController");

// api/admin
//create a new admin
router.post("/", createAdmin);

//login as admin
router.post("/auth", loginAdmin);

module.exports = router;
