const express = require("express");
const { router } = require("./userRoute");
const router = express.Router();

router.get("/", getAllUsers);

module.exports = router;
