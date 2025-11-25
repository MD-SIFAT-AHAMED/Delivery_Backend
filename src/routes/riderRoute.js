const express = require("express");
const { applyRider, getAllRider } = require("../controllers/riderController");
const {
  riderApplicationValidators,
} = require("../middlewares/validators/riderApplicationValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");

const router = express.Router();

router.get("/", verifyToken, getAllRider);
router.post(
  "/apply-rider",
  riderApplicationValidators,
  verifyToken,
  applyRider
);

module.exports = router;
