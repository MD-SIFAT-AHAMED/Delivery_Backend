const express = require("express");
const {
  getAllUsers,
  getAllRiderApplication,
  getAllAdmin,
  getAllParcels,
  approveRider,
  rejectRider,
} = require("../controllers/adminController");
const { verify } = require("jsonwebtoken");
const router = express.Router();

router.get("/", verify, getAllUsers);
router.get("/rider-application", verify, getAllRiderApplication);
router.get("/adminList", getAllAdmin);
router.get("/get-all-parcels", getAllParcels);
router.put("/approve-rider", approveRider);
router.put("/reject-rider", rejectRider);

module.exports = router;
