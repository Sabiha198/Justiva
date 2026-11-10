
const mongoose = require("mongoose");

const lawyerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    title: {
      type: String,
      default: "",
    },

    categories: {
      type: [String],
      default: [],
    },

    degree: {
      type: String,
      default: "",
    },

    experienceYears: {
      type: Number,
      default: 0,
    },

    photo: {
      type: String,
      default: "",
    },

    fee: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "BDT",
    },

    city: {
      type: String,
      default: "",
    },

    languages: {
      type: [String],
      default: [],
    },

    verified: {
      type: Boolean,
      default: false,
    },

    availability: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "closed-today",
    },

    bio: {
      type: String,
      default: "",
    },

    services: {
      type: [String],
      default: [],
    },

    experienceHighlights: {
      type: [String],
      default: [],
    },

    address: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "LawyerProfile",
  lawyerProfileSchema
);
