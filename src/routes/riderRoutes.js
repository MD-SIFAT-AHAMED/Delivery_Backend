const express = require("express");
const { applyRider } = require("../controllers/riderController");
const {
  validateRiderApplication,
} = require("../middlewares/validators/riderApplicationValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");

const router = express.Router();

router.post("/apply-rider", validateRiderApplication, verifyToken, applyRider);

module.exports = router;
