const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createReport,
  getMyReports,
} = require("../controllers/reportController");

router.post("/", protect, createReport);

router.get("/my", protect, getMyReports);



module.exports = router;