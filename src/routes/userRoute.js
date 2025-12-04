const express = require("express");
const {
  createUser,
  getOneUser,
  postParcel,
  getMyParcel,
} = require("../controllers/userController");
const {
  createUserValidator,
} = require("../middlewares/validators/createUserValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");
const parcelValidators = require("../middlewares/validators/parcelValidators");

const router = express.Router();

router.get("/info/:email", verifyToken, getOneUser);
router.post("/create-user", createUserValidator, createUser);
router.post("/parcel", parcelValidators, postParcel);
router.get("/my-parcel", getMyParcel);

module.exports = router;
