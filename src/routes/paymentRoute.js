const express = require("express");
const { route } = require("./userRoute");
const {
  postPayment,
  PostSuccessPayment,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-ssl-payment", postPayment);
router.post("/success-payment", PostSuccessPayment);

module.exports = router;
