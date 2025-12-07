const SslCommerzPayment = require("sslcommerz-lts/api/payment-controller");
const generateTransId = require("../utils/generateTransId");
const SSLCommerzPayment = require("sslcommerz-lts");
const Payment = require("../models/PaymentModel");
const calculateCost = require("../utils/calculateCost");
const {
  FRONTEND_URL,
  store_id,
  store_passwd,
  is_live,
} = require("../config/webConfig");

exports.postPayment = async (req, res) => {
  const payment = req.body;
  const cost = calculateCost(payment);
  try {
    const data = {
      total_amount: cost,
      currency: "BDT",
      tran_id: generateTransId(),
      tracking_id: payment.trackingId,
      success_url: `${FRONTEND_URL}/api/v1/payment/success-payment?trackingId=${payment.trackingId}`,
      fail_url: `${FRONTEND_URL}/api/v1/payment/fail-payment?trackingId=${payment.trackingId}`,
      cancel_url: `${FRONTEND_URL}/api/v1/payment/cancel-payment?trackingId=${payment.trackingId}`,
      ipn_url: `${FRONTEND_URL}/ipn`,
      shipping_method: "Courier",
      product_name: payment.title,
      product_category: payment.type,
      product_profile: "general",
      cus_name: payment.senderName,
      cus_email: payment.created_by,
      cus_add1: payment.senderRegion,
      cus_add2: payment.senderCenter,
      cus_city: payment.senderCenter,
      cus_state: payment.senderRegion,
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: payment.senderContact,
      cus_fax: payment.senderContact,
      ship_name: payment.receiverName,
      ship_add1: payment.receiverRegion,
      ship_add2: payment.receiverRegion,
      ship_city: payment.receiverRegion,
      ship_state: payment.receiverRegion,
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    console.log(data);

    const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live);

    const response = await sslcz.init(data);
    const GatewayPageURL = response.GatewayPageURL;
    console.log(response);
    res.status(200).json({
      success: true,
      message: "Initiate create successfuly",
      GatewayPageURL,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.PostSuccessPayment = async (req, res) => {
  const { val_id } = req.body; // SSLCommerz validation er jonno
  const { trackingId } = req.query; // parcel identify korar jonno

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const validConfirm = await sslcz.validate({ val_id });

    const { tran_id, amount, status, tran_date, card_type } = validConfirm;
    console.log(validConfirm);
    if (validConfirm.status !== "VALID") {
      return res.status(400).json({
        success: false,
        message: "Invalid Payment",
      });
    }

    // Parcel payment_status update
    await Payment.paymentUpdate(trackingId);

    // Payment info save
    await Payment.paymentInfo(
      trackingId,
      tran_id,
      val_id,
      amount,
      status,
      tran_date,
      card_type
    );

    // 3. Frontend success page e redirect
    return res.redirect(
      `${FRONTEND_URL}/payment-success?trackingId=${trackingId}`
    );
  } catch (error) {
    console.error("Success Payment Error:", error.message);

    return res.redirect(
      `${FRONTEND_URL}/payment-failed?trackingId=${trackingId}`
    );
  }
};

exports.postCancelPayment = async (req, res) => {
  const { status } = req.body;
  const { trackingId } = req.query;

  try {
    if (status === "CANCELLED") {
      await Payment.parcleDelete(trackingId);
    }

    // Cancel redirect
    return res.redirect(
      `${FRONTEND_URL}/payment-cancel?trackingId=${trackingId}`
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel payment",
      error: error.message,
    });
  }
};

exports.postPaymentFail = async (req, res) => {
  console.log("fail paymetn", req.body);
  const { status } = req.body;
  const { trackingId } = req.query;
  try {
    if (status === "FAILED") {
      await Payment.parcleDelete(trackingId);
    }

    // Fail redirect
    return res.redirect(
      `${FRONTEND_URL}/payment-fail?trackingId=${trackingId}`
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel payment",
      error: error.message,
    });
  }
};
