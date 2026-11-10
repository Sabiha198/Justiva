
const NGO = require("../models/ngo");

const getPublicNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find({})
      .sort({ name: 1 })
      .lean();

    const result = ngos.map((ngo) => ({
      id: ngo._id.toString(),
      name: ngo.name,
      logo: ngo.logo,
      focus: ngo.focus,
      description: ngo.description,
      servicesOffered: ngo.servicesOffered,
      city: ngo.city,
      contact: ngo.contact,
      email: ngo.email,
      verified: ngo.verified,
    }));

    res.json(result);
  } catch (error) {
    console.error("NGO fetch error:", error);
    res.status(500).json({
      message: "Failed to fetch NGOs",
    });
  }
};

module.exports = { getPublicNGOs };
