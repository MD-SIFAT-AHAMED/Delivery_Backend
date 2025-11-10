const express = require("express");
const {
  getAllUsers,
  createUser,
  createJWT,
} = require("../controllers/userController");
const {
  createUserValidator,
} = require("../middlewares/validators/userValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/create-user", createUserValidator, createUser);
router.post("/jwt", createJWT);


module.exports = router;
