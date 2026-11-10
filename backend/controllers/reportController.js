const Report = require("../models/report");

// Create a new crime report
const createReport = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      location,
      priority,
      anonymous,
    } = req.body;

    if (!type || !title || !description || !location) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    const report = await Report.create({
      user: req.user.userId,
      type,
      title,
      description,
      location,
      priority: priority || "Medium",
      anonymous: anonymous || false,
    });

    res.status(201).json({
      message: "Crime report submitted successfully.",
      report,
    });
  } catch (error) {
    console.error("Create report error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get reports belonging to logged-in citizen
const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      reports,
    });
  } catch (error) {
    console.error("Get my reports error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getMyReports,
};