const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtHelper");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM  users");
    res.status(200).send({
      success: true,
      message: "All User Records",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in GET All User API",
      error,
    });
  }
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

// json web token
exports.createJWT = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json(400).json({ message: "Email is required" });
  }

  try {
    const rows = await User.GetByEmail(email);
    console.log(rows)
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
