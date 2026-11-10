
const mongoose = require("mongoose");
const LawyerProfile = require("../models/lawyerProfile");

// Convert a MongoDB lawyer profile into frontend-friendly data
const formatLawyer = (profile) => {
  const name = profile.user?.name || "";

  return {
    id: profile._id.toString(),
    name,
    initials: name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),

    title: profile.title || "",
    degree: profile.degree || "",
    photo: profile.photo || "",
    categories: profile.categories || [],
    city: profile.city || "",
    verified: profile.verified === true,

    fee: profile.fee ?? null,
    currency: profile.currency || "BDT",
    experienceYears: profile.experienceYears ?? null,

    availability: profile.availability || "",
    status: profile.status || "",

    bio: profile.bio || "",
    services: profile.services || [],
    experienceHighlights: profile.experienceHighlights || [],

    address: profile.address || "",
    phone: profile.phone || "",
    languages: profile.languages || [],

    // No real reviews connected yet
    rating: null,
    reviews: 0,
    feedback: [],
  };
};

// GET /api/lawyers/featured
const getFeaturedLawyers = async (req, res) => {
  try {
    const profiles = await LawyerProfile.find({
      verified: true,
    })
      .populate("user", "name role")
      .sort({ createdAt: -1 })
      .lean();

    const lawyers = profiles
      .filter((profile) => profile.user?.role === "lawyer")
      .slice(0, 3)
      .map(formatLawyer);

    return res.json(lawyers);
  } catch (error) {
    console.error("Featured lawyers error:", error);

    return res.status(500).json({
      message: "Failed to load featured lawyers",
    });
  }
};

// GET /api/lawyers
const getPublicLawyers = async (req, res) => {
  try {
    const profiles = await LawyerProfile.find({
      verified: true,
    })
      .populate("user", "name role")
      .sort({ createdAt: -1 })
      .lean();

    const lawyers = profiles
      .filter((profile) => profile.user?.role === "lawyer")
      .map(formatLawyer);

    return res.json(lawyers);
  } catch (error) {
    console.error("Public lawyers error:", error);

    return res.status(500).json({
      message: "Failed to load lawyers",
    });
  }
};

// GET /api/lawyers/:id
const getPublicLawyerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid lawyer ID",
      });
    }

    const profile = await LawyerProfile.findOne({
      _id: id,
      verified: true,
    })
      .populate("user", "name role")
      .lean();

    if (!profile || profile.user?.role !== "lawyer") {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    return res.json(formatLawyer(profile));
  } catch (error) {
    console.error("Lawyer details error:", error);

    return res.status(500).json({
      message: "Failed to load lawyer details",
    });
  }
};

module.exports = {
  getFeaturedLawyers,
  getPublicLawyers,
  getPublicLawyerById,
};
