const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getCitizenStats,
  getUpcomingAppointments,
} = require("../controllers/dashboardController");

router.get("/citizen/stats", protect, getCitizenStats);

router.get(
  "/citizen/upcoming-appointments",
  protect,
  getUpcomingAppointments
);

module.exports = router;