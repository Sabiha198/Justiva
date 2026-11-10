const mongoose = require("mongoose");
const LawyerProfile = require("../models/lawyerProfile");
const User = require("../models/user");
const getAdminLawyers = async (req, res) => {
  try {
    const profiles = await LawyerProfile.find({})
      .populate("user", "name role")
      .sort({ createdAt: -1 })
      .lean();

    const lawyers = profiles
      .filter((profile) => profile.user?.role === "lawyer")
      .map((profile) => {
        const name = profile.user.name;

        return {
          id: profile._id.toString(),
          name,
          initials: name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase(),
          title: profile.title || "",
          city: profile.city || "",
          experienceYears: profile.experienceYears ?? 0,
          fee: profile.fee ?? 0,
          currency: profile.currency || "BDT",
          rating: profile.rating ?? null,
          verified: profile.verified === true,
        };
      });

    res.status(200).json(lawyers);
  } catch (error) {
    console.error("Admin lawyers error:", error);
    res.status(500).json({
      message: "Failed to load lawyers",
    });
  }
};

const verifyLawyer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid lawyer ID" });
    }

    const verified = req.body.verified !== false; // default: approve

    const profile = await LawyerProfile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Lawyer profile not found" });
    }

    profile.verified = verified;
    await profile.save();

    // Keep the User record in sync.
    await User.findByIdAndUpdate(profile.user, { isVerified: verified });

    res.json({
      message: verified ? "Lawyer verified" : "Lawyer verification removed",
      id: profile._id,
      verified,
    });
  } catch (error) {
    console.error("Verify lawyer error:", error);
    res.status(500).json({ message: "Failed to update verification" });
  }
};

module.exports = { getAdminLawyers, verifyLawyer };
