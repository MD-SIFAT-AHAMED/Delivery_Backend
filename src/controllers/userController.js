const User = require("../models/userModel");

exports.getOneUser = async (req, res) => {
  const email = req.params.email;
  const user = await User.GetByEmail(email);
  console.log(user);
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
