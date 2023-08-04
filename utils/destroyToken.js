const asyncHandler = require("express-async-handler");

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

module.exports = logoutUser;
