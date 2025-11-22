const express = require("express");
const { createUser, getOneUser } = require("../controllers/userController");
const {
  createUserValidator,
} = require("../middlewares/validators/userValidators");
const { verifyToken } = require("../middlewares/authMiddlewares/verifyJWT");

const router = express.Router();
exports.router = router;

router.get("/info/:email", verifyToken, getOneUser);
router.post("/create-user", createUserValidator, createUser);

module.exports = router;
