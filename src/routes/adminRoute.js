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
  patchStatusUpdate,
  getPaymentHistory,
  getTotalSummary,
  getApproveRider,
  patchAssignRider,
} = require("../controllers/adminController");
const { verify } = require("jsonwebtoken");
const { adminAuth } = require("../middlewares/authMiddlewares/adminAuth");
const router = express.Router();

router.get("/", verify, getAllUsers);
router.get("/rider-application", verify, adminAuth, getAllRiderApplication);
router.get("/adminList", verify, adminAuth, getAllAdmin);
router.get("/get-all-parcels", verify, adminAuth, getAllParcels);
router.get("/rider-info", verify, adminAuth, getRiderInfo);
router.put("/approve-riderAppilcation", verify, adminAuth, approveRider);
router.put("/reject-riderAppilcation", verify, adminAuth, rejectRider);
router.delete("/delete-riderAppilcation", verify, adminAuth, deleteRider);
router.get("/user-info", verify, adminAuth, getuserInfo);
router.delete("/delete-user", verify, adminAuth, deleteUser);
router.get("/parcel-info", verify, adminAuth, getParcelInfo);
router.delete("/delete-parcel", verify, adminAuth, deleteParcel);
router.patch("/update-status/:id", verify, adminAuth, patchStatusUpdate);
router.get("/payment-history", verify, adminAuth, getPaymentHistory);
router.get("/total-summary", verify, adminAuth, getTotalSummary);
router.get("/approve-rider", verify, adminAuth, getApproveRider);
router.patch("/assign-rider/:parcelId", verify, adminAuth, patchAssignRider);

module.exports = router;
