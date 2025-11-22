const express = require("express");
const {
  getAllUsers,
  getAllRiderApplication,
} = require("../controllers/adminController");
const { verify } = require("jsonwebtoken");
const router = express.Router();

router.get("/", verify, getAllUsers);
router.get("/rider-application", getAllRiderApplication);

module.exports = router;
