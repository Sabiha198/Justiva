const mongoose = require("mongoose");
const LawyerProfile = require("../models/lawyerProfile");
const Appointment = require("../models/appointment");
const User = require("../models/user");

// Fields a lawyer is allowed to edit. "verified" is NOT here on purpose:
// only an admin can verify a lawyer.
const TEXT_FIELDS = [
  "title", "degree", "photo", "currency", "city",
  "availability", "status", "bio", "address", "phone",
];
const NUMBER_FIELDS = ["experienceYears", "fee"];
const ARRAY_FIELDS = [
  "categories", "languages", "services", "experienceHighlights",
];

// Find the lawyer's profile, or create an empty one if missing.
const getOrCreateProfile = async (userId) => {
  let profile = await LawyerProfile.findOne({ user: userId });
  if (!profile) {
    profile = await LawyerProfile.create({ user: userId });
  }
  return profile;
};

// GET /api/lawyer/profile
const getMyProfile = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user.id);
    const user = await User.findById(req.user.id).select("name email");

    res.json({ profile, user });
  } catch (error) {
    console.error("Lawyer profile error:", error);
    res.status(500).json({ message: "Failed to load profile" });
  }
};

// PUT /api/lawyer/profile
const updateMyProfile = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user.id);

    for (const field of TEXT_FIELDS) {
      if (req.body[field] !== undefined) {
        profile[field] = String(req.body[field]).trim();
      }
    }

    for (const field of NUMBER_FIELDS) {
      if (req.body[field] !== undefined) {
        const value = Number(req.body[field]);
        if (!Number.isFinite(value) || value < 0) {
          return res.status(400).json({
            message: `${field} must be a positive number`,
          });
        }
        profile[field] = value;
      }
    }

    for (const field of ARRAY_FIELDS) {
      if (req.body[field] !== undefined) {
        if (!Array.isArray(req.body[field])) {
          return res.status(400).json({
            message: `${field} must be a list`,
          });
        }
        profile[field] = req.body[field].map((item) => String(item).trim());
      }
    }

    // The name lives in the User collection.
    if (req.body.name && req.body.name.trim()) {
      await User.findByIdAndUpdate(req.user.id, { name: req.body.name.trim() });
    }

    await profile.save();

    res.json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Update lawyer profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// GET /api/lawyer/dashboard
const getDashboard = async (req, res) => {
  try {
    const lawyerId = req.user.id;

    const [profile, pending, confirmed, completed, total, upcoming] =
      await Promise.all([
        getOrCreateProfile(lawyerId),
        Appointment.countDocuments({ lawyer: lawyerId, status: "Pending" }),
        Appointment.countDocuments({ lawyer: lawyerId, status: "Confirmed" }),
        Appointment.countDocuments({ lawyer: lawyerId, status: "Completed" }),
        Appointment.countDocuments({ lawyer: lawyerId }),
        Appointment.find({
          lawyer: lawyerId,
          status: { $in: ["Pending", "Confirmed"] },
        })
          .populate("user", "name email")
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    res.json({
      verified: profile.verified,
      stats: {
        totalAppointments: total,
        pendingAppointments: pending,
        confirmedAppointments: confirmed,
        completedAppointments: completed,
      },
      upcomingAppointments: upcoming,
    });
  } catch (error) {
    console.error("Lawyer dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

// GET /api/lawyer/appointments?status=Pending
const getMyAppointments = async (req, res) => {
  try {
    const filter = { lawyer: req.user.id };

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (req.query.status) {
      if (!validStatuses.includes(req.query.status)) {
        return res.status(400).json({ message: "Invalid status filter" });
      }
      filter.status = req.query.status;
    }

    const appointments = await Appointment.find(filter)
      .populate("user", "name email phone city")
      .sort({ createdAt: -1 });

    res.json({ appointments });
  } catch (error) {
    console.error("Lawyer appointments error:", error);
    res.status(500).json({ message: "Failed to load appointments" });
  }
};

// PATCH /api/lawyer/appointments/:id/status   body: { "status": "Confirmed" }
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    if (!["Confirmed", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Confirmed, Completed or Cancelled",
      });
    }

    // The lawyer can only change THEIR OWN appointments.
    const appointment = await Appointment.findOne({
      _id: id,
      lawyer: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (["Cancelled", "Completed"].includes(appointment.status)) {
      return res.status(400).json({
        message: `This appointment is already ${appointment.status}`,
      });
    }

    if (status === "Completed" && appointment.status !== "Confirmed") {
      return res.status(400).json({
        message: "Only a confirmed appointment can be completed",
      });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: `Appointment ${status.toLowerCase()}`, appointment });
  } catch (error) {
    console.error("Update appointment status error:", error);
    res.status(500).json({ message: "Failed to update appointment" });
  }
};

// GET /api/lawyer/clients  (unique citizens who booked this lawyer)
const getMyClients = async (req, res) => {
  try {
    const appointments = await Appointment.find({ lawyer: req.user.id })
      .populate("user", "name email city")
      .sort({ createdAt: -1 });

    const clients = new Map();

    for (const appointment of appointments) {
      if (!appointment.user) continue;

      const key = appointment.user._id.toString();

      if (!clients.has(key)) {
        clients.set(key, {
          id: key,
          name: appointment.user.name,
          email: appointment.user.email,
          city: appointment.user.city,
          totalAppointments: 0,
          lastAppointment: appointment.createdAt,
        });
      }

      clients.get(key).totalAppointments += 1;
    }

    res.json({ clients: [...clients.values()] });
  } catch (error) {
    console.error("Lawyer clients error:", error);
    res.status(500).json({ message: "Failed to load clients" });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getDashboard,
  getMyAppointments,
  updateAppointmentStatus,
  getMyClients,
};