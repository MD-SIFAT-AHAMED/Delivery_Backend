const express = require("express");
const { route } = require("./userRoute");
const { postPayment } = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-ssl-payment", postPayment);
