const express = require("express");
const { applyRider, getAllRider } = require("../controllers/riderController");
const {
  validateRiderApplication,
} = require("../middlewares/validators/riderApplicationValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");

const router = express.Router();

router.get("/", verifyToken, getAllRider);
router.post("/apply-rider", validateRiderApplication, verifyToken, applyRider);

module.exports = router;
