const db = require("../config/db");

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
  const { name, email } = req.body;
  try {
    const data = await db.query("INSERT INTO users (name,email) VALUES (?.?)", [
      name,
      email,
    ]);
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Database Insert Error",
      error,
    });
  }
};
