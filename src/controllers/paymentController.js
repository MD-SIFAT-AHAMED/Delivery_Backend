const SslCommerzPayment = require("sslcommerz-lts/api/payment-controller");
const generateTransId = require("../utils/generateTransId");
const SSLCommerzPayment = require("sslcommerz-lts");
const Payment = require("../models/PaymentModel");

const store_id = process.env.Store_ID;
const store_passwd = process.env.Store_Password;
const is_live = false; //true for live, false for sandbox

exports.postPayment = async (req, res) => {
  const payment = req.body;
  console.log("payment id", payment.trackingId);

  try {
    const data = {
      total_amount: payment.cost,
      currency: "BDT",
      tran_id: generateTransId(),
      tracking_id: payment.trackingId,
      success_url: `http://localhost:5000/api/v1/payment/success-payment?trackingId=${payment.trackingId}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
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

    const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live);

    const response = await sslcz.init(data);
    const GatewayPageURL = response.GatewayPageURL;
    // console.log(response );
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
  const { val_id, tracking_id } = req.body;
  const { trackingId } = req.query;

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const validConfrim = await sslcz.validate({ val_id });
  const { tran_id, amount, status, tran_date } = validConfrim;

  if (validConfrim.status !== "VALID") {
    res.send({
      message: "Invalid Payment",
    });
  }
  // Parcel payment_status update
  await Payment.paymentUpdate(trackingId);
  //Payment info save
  await Payment.paymentInfo(
    trackingId,
    tran_id,
    val_id,
    amount,
    status,
    tran_date
  );
};
