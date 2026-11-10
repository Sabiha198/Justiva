const mongoose = require("mongoose");
const User = require("../models/user");
const Report = require("../models/report");
const Appointment = require("../models/appointment");
const LawyerProfile = require("../models/lawyerProfile");
const NGO = require("../models/ngo");

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ---------------- DASHBOARD STATS ----------------
// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const [
      totalUsers, citizens, lawyers, authorities,
      verifiedLawyers, pendingLawyers,
      totalReports, activeReports, resolvedReports,
      totalAppointments, pendingAppointments,
      ngos,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: "citizen" }),
      User.countDocuments({ role: "lawyer" }),
      User.countDocuments({ role: "authority" }),
      LawyerProfile.countDocuments({ verified: true }),
      LawyerProfile.countDocuments({ verified: false }),
      Report.countDocuments({}),
      Report.countDocuments({
        status: { $in: ["Submitted", "Under Review", "Investigating"] },
      }),
      Report.countDocuments({ status: "Resolved" }),
      Appointment.countDocuments({}),
      Appointment.countDocuments({ status: "Pending" }),
      NGO.countDocuments({}),
    ]);

    res.json({
      users: { total: totalUsers, citizens, lawyers, authorities },
      lawyers: { verified: verifiedLawyers, pending: pendingLawyers },
      reports: {
        total: totalReports,
        active: activeReports,
        resolved: resolvedReports,
      },
      appointments: { total: totalAppointments, pending: pendingAppointments },
      ngos,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to load statistics" });
  }
};

// ---------------- USERS ----------------
// GET /api/admin/users?role=citizen&search=rafi
const getUsers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.role) filter.role = req.query.role;

    if (req.query.search && req.query.search.trim()) {
      const regex = new RegExp(escapeRegex(req.query.search.trim()), "i");
      filter.$or = [{ name: regex }, { email: regex }];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    console.error("Admin users error:", error);
    res.status(500).json({ message: "Failed to load users" });
  }
};

// PATCH /api/admin/users/:id/status   body: { "status": "suspended" }
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!["active", "suspended"].includes(status)) {
      return res.status(400).json({
        message: "Status must be active or suspended",
      });
    }

    if (id === req.user.id) {
      return res.status(400).json({
        message: "You cannot change your own account status",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `User ${status}`, user });
  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// ---------------- REPORTS ----------------
// GET /api/admin/reports?status=Submitted
const getReports = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const reports = await Report.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    // Respect anonymity: never reveal who filed an anonymous report.
    const result = reports.map((report) => ({
      ...report,
      reporter: report.anonymous
        ? "Anonymous"
        : report.user?.name || "Unknown",
      user: undefined,
    }));

    res.json({ reports: result });
  } catch (error) {
    console.error("Admin reports error:", error);
    res.status(500).json({ message: "Failed to load reports" });
  }
};

// PATCH /api/admin/reports/:id/status   body: { "status": "Resolved" }
const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Submitted", "Under Review", "Investigating", "Resolved", "Rejected",
    ];

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Report status updated", report });
  } catch (error) {
    console.error("Update report status error:", error);
    res.status(500).json({ message: "Failed to update report" });
  }
};

// ---------------- APPOINTMENTS ----------------
// GET /api/admin/appointments?status=Pending
const getAppointments = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const appointments = await Appointment.find(filter)
      .populate("user", "name email")
      .populate("lawyer", "name email")
      .sort({ createdAt: -1 });

    res.json({ appointments });
  } catch (error) {
    console.error("Admin appointments error:", error);
    res.status(500).json({ message: "Failed to load appointments" });
  }
};

// ---------------- NGOs ----------------
// GET /api/admin/ngos
const getNgos = async (req, res) => {
  try {
    const ngos = await NGO.find({}).sort({ name: 1 });
    res.json({ ngos });
  } catch (error) {
    console.error("Admin NGOs error:", error);
    res.status(500).json({ message: "Failed to load NGOs" });
  }
};

// POST /api/admin/ngos
const createNgo = async (req, res) => {
  try {
    const { name, logo, focus, description, servicesOffered, city, contact, email } =
      req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "NGO name is required" });
    }

    const ngo = await NGO.create({
      name: name.trim(),
      logo,
      focus,
      description,
      servicesOffered: Array.isArray(servicesOffered) ? servicesOffered : [],
      city,
      contact,
      email,
    });

    res.status(201).json({ message: "NGO created", ngo });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "An NGO with this name already exists" });
    }
    console.error("Create NGO error:", error);
    res.status(500).json({ message: "Failed to create NGO" });
  }
};

// PATCH /api/admin/ngos/:id/verify   body: { "verified": true }
const verifyNgo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid NGO ID" });
    }

    const verified = req.body.verified !== false;

    const ngo = await NGO.findByIdAndUpdate(id, { verified }, { new: true });
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.json({ message: verified ? "NGO verified" : "NGO unverified", ngo });
  } catch (error) {
    console.error("Verify NGO error:", error);
    res.status(500).json({ message: "Failed to update NGO" });
  }
};

// DELETE /api/admin/ngos/:id
const deleteNgo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid NGO ID" });
    }

    const ngo = await NGO.findByIdAndDelete(id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.json({ message: "NGO deleted" });
  } catch (error) {
    console.error("Delete NGO error:", error);
    res.status(500).json({ message: "Failed to delete NGO" });
  }
};

module.exports = {
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
};