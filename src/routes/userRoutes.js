const express = require("express");
const {
  getAllUsers,
  createUser,
  createJWT,
  getOneUser,
} = require("../controllers/userController");
const {
  createUserValidator,
} = require("../middlewares/validators/userValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/info/:email", getOneUser);
router.post("/create-user", createUserValidator, createUser);
router.post("/jwt", createJWT);

module.exports = router;
