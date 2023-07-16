const express = require("express");
const router = express.Router();
const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/plansController");
const protect = require("../middleware/routeProtection");

// api/plans
//get all plans
router.get("/", getPlans);
//create new plan "protect (admin)"
router.post("/", protect("admin"), createPlan);
//edit plan
router.put("/:id", protect("admin"), updatePlan);
//delete plan
router.delete("/:id", protect("admin"), deletePlan);

module.exports = router;
