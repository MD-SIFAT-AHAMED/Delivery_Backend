const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtHelper");

// json web token
exports.createJWT = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json(400).json({ message: "Email is required" });
  }

  try {
    const rows = await User.GetByEmail(email);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found in database" });
    }
    const user = rows;

    // Token generate
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: "Token generated successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("JWT error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


