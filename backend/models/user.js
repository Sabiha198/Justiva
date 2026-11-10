
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["citizen", "lawyer", "authority", "admin"],
      default: "citizen",
    },

    // Lawyer profile information
    specialization: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    consultationFee: {
      type: Number,
      default: null,
    },

    // Only admins should be allowed to approve lawyers.
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
