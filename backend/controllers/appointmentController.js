const mongoose = require("mongoose");
const Appointment = require("../models/appointment");
const LawyerProfile = require("../models/lawyerProfile");

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { lawyerId, lawyerName, date, time, purpose } = req.body;

    let lawyerUserId;
    let finalLawyerName = lawyerName;

    // If the frontend sends a real lawyer profile id, link the booking to that lawyer.
    if (lawyerId) {
      if (!mongoose.isValidObjectId(lawyerId)) {
        return res.status(400).json({ message: "Invalid lawyer ID." });
      }

      const profile = await LawyerProfile.findOne({
        _id: lawyerId,
        verified: true,
      }).populate("user", "name");

      if (!profile || !profile.user) {
        return res.status(404).json({ message: "Lawyer not found." });
      }

      lawyerUserId = profile.user._id;
      finalLawyerName = profile.user.name;
    }

    if (!finalLawyerName || !date || !time || !purpose) {
      return res.status(400).json({
        message: "Please provide all required appointment fields.",
      });
    }

    // Prevent two bookings for the same lawyer, date and time.
    if (lawyerUserId) {
      const taken = await Appointment.findOne({
        lawyer: lawyerUserId,
        date,
        time,
        status: { $in: ["Pending", "Confirmed"] },
      });

      if (taken) {
        return res.status(409).json({
          message: "This time slot is already booked. Please choose another.",
        });
      }
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      lawyer: lawyerUserId,
      lawyerName: finalLawyerName,
      date,
      time,
      purpose,
      status: "Pending",
    });

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get appointments of the logged-in citizen
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    appointment.status = "Cancelled";

    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully.",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Reschedule an appointment
const rescheduleAppointment = async (req, res) => {
  try {
    const { time } = req.body;

    if (!time) {
      return res.status(400).json({
        message: "New time is required.",
      });
    }

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    appointment.time = time;
    appointment.status = "Pending";

    await appointment.save();

    res.status(200).json({
      message: "Appointment rescheduled successfully.",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  rescheduleAppointment,
};