const jwt = require("jsonwebtoken");

const generateToken = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: "strict",
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
