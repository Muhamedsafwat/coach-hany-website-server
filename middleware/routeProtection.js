const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = function (role) {
  return asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    //check if request has a token
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (role == decodedToken.role || role == "all") {
          next();
        } else {
          res.status(401);
          throw new Error("Not authorized for this request");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token found");
    }
  });
};

module.exports = protect;
