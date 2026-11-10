const express = require("express");

const {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  rescheduleAppointment,
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my", authMiddleware, getMyAppointments);

router.post("/", authMiddleware, createAppointment);

router.patch(
  "/:id/cancel",
  authMiddleware,
  cancelAppointment
);

router.patch(
  "/:id/reschedule",
  authMiddleware,
  rescheduleAppointment
);

module.exports = router;