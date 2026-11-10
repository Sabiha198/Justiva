
const Report = require("../models/report");
const LawyerProfile = require("../models/lawyerProfile");
const NGO = require("../models/ngo");
const getPublicStats = async (req, res) => {
  try {
    // Count actual reports in MongoDB.
    const totalReports = await Report.countDocuments({});
    const partnerNGOs = await NGO.countDocuments({
  verified: true,
});

    // Count verified lawyers.
    // Adjust field names to match your User schema.
const verifiedLawyers = await LawyerProfile.countDocuments({
  verified: true,
});

    res.status(200).json({
      reportsFiled: totalReports,
      verifiedAdvocates: verifiedLawyers,

      // Not available until response timestamps are stored.
      medianFirstResponseHours: null,

      // Not available until an NGO collection exists.
      partnerNGOs: partnerNGOs,
    });
  } catch (error) {
    console.error("Public stats error:", error);
    res.status(500).json({
      message: "Failed to load public statistics",
    });
  }
};

module.exports = { getPublicStats };
