const express = require("express");
const router = express.Router();

const {
  getAdminLawyers,
  verifyLawyer,
} = require("../controllers/adminLawyerController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.use(protect,authorizeRoles("admin"));

router.get("/", getAdminLawyers);
router.patch("/:id/verify", verifyLawyer);

module.exports = router;