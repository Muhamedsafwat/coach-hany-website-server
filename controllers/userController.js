const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Create new user
// POST => /api/users
// Private "only admin"
const createUser = asyncHandler(async (req, res) => {
  const { code, password } = req.body;
  const userExists = await User.findOne({ code });
  //check if code already used
  if (userExists) {
    res.status(400);
    throw new Error("A user with this code already exists");
  }
  //create new user
  const user = await User.create({
    code,
    password,
  });
  if (user) {
    res.status(201).send("User created successfully");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
// POST => /api/users/auth
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { code, password } = req.body;
  const user = await User.findOne({ code });
  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id, "user");
    res.status(201).json({
      _id: user._id,
      name: user.name || null,
      code: user.code,
    });
  } else {
    res.status(401);
    throw new Error("Invalid code or password");
  }
});

// Get all users
// GET => /api/users
// Private "only admin"
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(404);
    throw new Error("No users found");
  }
  res.json(users);
});

// Get one user
// GET => /api/users/:id
// Private "user & admin"
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

// update user profile
// PUT => /api/users/:id
// Private "user"
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;
    user.measurements = req.body.measurements || user.measurements;

    const updatedUser = await user.save();
    res.status(200).json({
      name: updatedUser.name,
      measurements: updatedUser.measurements,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// delete user
// DELETE => /api/users/:id
// Private "admin"
const deleteUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).send("Deleted successfully");
  } else {
    res.status(404);
    throw new Error("plan not found");
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
