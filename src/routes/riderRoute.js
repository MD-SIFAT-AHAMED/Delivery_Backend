const express = require("express");
const {
  applyRider,
  getAllRider,
  getAssignParcel,
} = require("../controllers/riderController");
const {
  riderApplicationValidators,
} = require("../middlewares/validators/riderApplicationValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");

const router = express.Router();


router.post(
  "/apply-rider",
  riderApplicationValidators,
  verifyToken,
  applyRider
);
router.get("/assign-parcel", getAssignParcel);

module.exports = router;
