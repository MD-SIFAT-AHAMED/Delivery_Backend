const express = require("express");
const {
  getAllUsers,
  getAllRiderApplication,
  getAllAdmin,
  getAllParcels,
  approveRider,
  rejectRider,
  deleteRider,
  getRiderInfo,
  getuserInfo,
  deleteUser,
  getParcelInfo,
  deleteParcel,
} = require("../controllers/adminController");
const { verify } = require("jsonwebtoken");
const router = express.Router();

router.get("/", verify, getAllUsers);
router.get("/rider-application", verify, getAllRiderApplication);
router.get("/adminList", getAllAdmin);
router.get("/get-all-parcels", getAllParcels);
router.get("/rider-info", getRiderInfo);
router.put("/approve-riderAppilcation", approveRider);
router.put("/reject-riderAppilcation", rejectRider);
router.delete("/delete-riderAppilcation", deleteRider);
router.get("/user-info", getuserInfo);
router.delete("/delete-user", deleteUser);
router.get("/parcel-info", getParcelInfo);
router.delete("/delete-parcel", deleteParcel);

module.exports = router;
