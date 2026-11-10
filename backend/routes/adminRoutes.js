const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getStats,
  getUsers,
  updateUserStatus,
  getReports,
  updateReportStatus,
  getAppointments,
  getNgos,
  createNgo,
  verifyNgo,
  deleteNgo,
} = require("../controllers/adminController");

// Only logged-in admins can use anything below.
router.use(protect, authorizeRoles("admin"));

router.get("/stats", getStats);

router.get("/users", getUsers);
router.patch("/users/:id/status", updateUserStatus);

router.get("/reports", getReports);
router.patch("/reports/:id/status", updateReportStatus);

router.get("/appointments", getAppointments);

router.get("/ngos", getNgos);
router.post("/ngos", createNgo);
router.patch("/ngos/:id/verify", verifyNgo);
router.delete("/ngos/:id", deleteNgo);

module.exports = router;