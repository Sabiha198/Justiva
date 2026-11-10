
const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
      default: "",
    },
    focus: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    servicesOffered: {
      type: [String],
      default: [],
    },
    city: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NGO", ngoSchema);
