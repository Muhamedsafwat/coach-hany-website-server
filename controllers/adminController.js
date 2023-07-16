const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

// register admin
// POST :/api/admin
// private "delete before production"
const createAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.create({ username, password });
  res.send(admin);
});

// login admin
// POST :/api/admin/auth
// public
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPasswords(password))) {
    generateToken(res, admin._id, "admin");
    res.status(201).json({
      _id: admin._id,
      username: admin.username,
    });
  } else {
    res.status(401);
    throw new Error("invalid username or password");
  }
});

module.exports = { createAdmin, loginAdmin };
