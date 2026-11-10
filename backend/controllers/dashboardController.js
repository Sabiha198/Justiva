const Report = require("../models/report");
const Appointment = require("../models/appointment");

const getCitizenStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [
      totalReports,
      activeReports,
      resolvedReports,
      totalAppointments,
      upcomingAppointments,
    ] = await Promise.all([
      Report.countDocuments({
        user: userId,
      }),

      Report.countDocuments({
        user: userId,
        status: {
          $in: ["Submitted", "Under Review", "Investigating"],
        },
      }),

      Report.countDocuments({
        user: userId,
        status: "Resolved",
      }),

      Appointment.countDocuments({
        user: userId,
      }),

      Appointment.countDocuments({
        user: userId,
        status: {
          $in: ["Pending", "Confirmed"],
        },
      }),
    ]);

    res.status(200).json({
      stats: {
        totalReports,
        activeReports,
        resolvedReports,
        totalAppointments,
        upcomingAppointments,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to load dashboard statistics.",
      error: error.message,
    });
  }
};

const getUpcomingAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user.userId,
      status: { $in: ["Pending", "Confirmed"] },
    })
      .sort({ date: 1, time: 1 })
      .limit(5);

    res.status(200).json({
      appointments,
    });
  } catch (error) {
    console.error("Get upcoming appointments error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getCitizenStats,
  getUpcomingAppointments,
};