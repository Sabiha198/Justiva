
const express = require("express");
const router = express.Router();

const {
  getFeaturedLawyers,
  getPublicLawyers,
  getPublicLawyerById,
} = require("../controllers/publicLawyerController");

router.get("/featured", getFeaturedLawyers);
router.get("/", getPublicLawyers);
router.get("/:id", getPublicLawyerById);

module.exports = router;
