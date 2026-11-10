
const express = require("express");
const router = express.Router();

const {
  getPublicStats,
} = require("../controllers/publicStatsController");

// Public endpoint: no JWT required.
router.get("/stats", getPublicStats);

module.exports = router;
