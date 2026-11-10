
const express = require("express");
const router = express.Router();

const {
  getPublicNGOs,
} = require("../controllers/publicNgoController");

router.get("/", getPublicNGOs);

module.exports = router;
