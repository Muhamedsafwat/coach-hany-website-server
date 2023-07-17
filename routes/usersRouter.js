// user Router "api/users"
const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middleware/routeProtection");

//create new user "admin only"
router.post("/", protect("admin"), createUser);
//login user
router.post("/auth", loginUser);
//get all users "admin only"
router.get("/", protect("admin"), getAllUsers);
//get one user "user & admin"
router.get("/:id", protect("all"), getUser);
//update user profile "user only"
router.put("/:id", protect("user"), updateUser);
//delete user profile "admin only"
router.delete("/:id", protect("admin"), deleteUser);

module.exports = router;
