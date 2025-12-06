const db = require("../config/db");
const rider = require("../models/riderModel");
const User = require("../models/userModel");

exports.applyRider = async (req, res) => {
  const { age, contact, email, license, name, nid, region } = req.body;

  try {
    const alreadyExistingRider = await rider.getByEmail(email);
    if (alreadyExistingRider) {
      return res.status(409).json({
        success: false,
        message: "You already submitted a rider application.",
      });
    }

    const result = await rider.postRider(
      name,
      age,
      email,
      region,
      contact,
      nid,
      license
    );
    res.status(200).json({
      success: true,
      message: "Rider aplication successfuly",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getAssignParcel = async (req, res) => {
  const { email } = req.query;
  try {
    const riderId = await rider.getRiderId(email);
    const result = await rider.getAssignparcel(riderId);
    res.status(200).json({
      success: true,
      message: "Get All Assign parcel successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
