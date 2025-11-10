const db = require("../config/db");
const rider = require("../models/riderModel");
const User = require("../models/userModel");

exports.applyRider = async (req, res) => {
  const { age, contact, email, license, name, nid, region } = req.body;

  try {
    const existingUser = await User.GetByEmail(email);
    const user_id = existingUser ? existingUser.id : null;
    
    const result = await rider.postRider(
      user_id,
      name,
      age,
      email,
      region,
      contact,
      nid,
      license
    );
    res.status(201).json({
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
