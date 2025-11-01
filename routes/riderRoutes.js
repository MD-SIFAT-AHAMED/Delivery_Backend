const express = require("express");
const { applyRider } = require("../controllers/riderController");
const {
  validateRiderApplication,
} = require("../middlewares/validators/riderApplicationValidators");

const router = express.Router();

router.post("/apply-rider", validateRiderApplication, applyRider);

module.exports = router;
