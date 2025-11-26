const express = require("express");
const { route } = require("./userRoute");
const {
  postPayment,
  PostSuccessPayment,
  postCancelPayment,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-ssl-payment", postPayment);
router.post("/success-payment", PostSuccessPayment);
// router.post("/fail-payment", PostSuccessPayment);
router.post("/cancel-payment", postCancelPayment);

module.exports = router;
