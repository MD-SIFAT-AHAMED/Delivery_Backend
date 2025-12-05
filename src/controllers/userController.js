const User = require("../models/userModel");
const calculateCost = require("../utils/calculateCost");
const GenerateTrackingId = require("../utils/hdfgd");

exports.getOneUser = async (req, res) => {
  const email = req.params.email;
  const user = await User.GetByEmail(email);
  res.json(user);
};

// Create new user
exports.createUser = async (req, res) => {
  const { name, email, address, role, is_active } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.GetByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    // OtherWise, create a new user
    const [result] = await User.create(name, email, address, role, is_active);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// Parcel info post
exports.postParcel = async (req, res) => {
  const {
    type,
    title,
    senderName,
    senderContact,
    senderRegion,
    senderCenter,
    senderAddress,
    pickupInstruction,
    receiverName,
    receiverContact,
    receiverRegion,
    receiverCenter,
    receiverAddress,
    deliveryInstruction,
    weight = null,
    delivery_status,
    payment_status,
    created_by,
    trackingId,
  } = req.body;
  const data = req.body;

  try {
    const trackingId = GenerateTrackingId();
    const cost = calculateCost(data);
    await User.PostParcelInfo(
      type,
      title,
      senderName,
      senderContact,
      senderRegion,
      senderCenter,
      senderAddress,
      pickupInstruction,
      receiverName,
      receiverContact,
      receiverRegion,
      receiverCenter,
      receiverAddress,
      deliveryInstruction,
      weight,
      cost,
      delivery_status,
      payment_status,
      created_by,
      trackingId
    );
    res.status(200).json({
      success: true,
      message: "Parcel created successfully. Tracking ID generated.",
      trackingId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getMyParcel = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await User.getMyParcel(email);
    res.status(200).json({
      success: true,
      message: "Get My parcel is Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
