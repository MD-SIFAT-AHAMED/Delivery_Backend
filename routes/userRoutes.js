const express = require("express");
const { getAllUsers, createUser } = require("../controllers/userController");
const {
  createUserValidator,
} = require("../middlewares/validators/userValidators");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/create-user", createUserValidator, createUser);

module.exports = router;
