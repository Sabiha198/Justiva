const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getMyProfile,
  updateMyProfile,
  getDashboard,
  getMyAppointments,
  updateAppointmentStatus,
  getMyClients,
} = require("../controllers/lawyerController");

// Every route below needs: 1) a valid login token  2) role = lawyer
router.use(protect, authorizeRoles("lawyer"));

router.get("/dashboard", getDashboard);
router.get("/profile", getMyProfile);
router.put("/profile", updateMyProfile);
router.get("/appointments", getMyAppointments);
router.patch("/appointments/:id/status", updateAppointmentStatus);
router.get("/clients", getMyClients);

module.exports = router;