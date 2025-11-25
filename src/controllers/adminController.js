const Admin = require("../models/adminModel");

// Get all users
exports.getAllUsers = async (req, res) => {
  let search = req.query.search?.trim();
  try {
    let data;
    if (search && search.length > 0) {
      data = await Admin.getAll(search);
    } else {
      data = await Admin.getAll();
    }

    res.status(200).send({
      success: true,
      message: "All User Records",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in GET All User API",
      error,
    });
  }
};

// Get all rider application
exports.getAllRiderApplication = async (req, res) => {
  try {
    const data = await Admin.getAllRiderApplications();
    res.status(200).send({
      success: true,
      message: "All User Records",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in GET All Rider Application API",
      error,
    });
  }
};

// Get all admin list
exports.getAllAdmin = async (req,res) => {
  try {
    const data = await Admin.getAllAdmin();
    res.status(200).send({
      success: true,
      message: "All User Records",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in GET All Admin List API",
      error,
    });
  }
};
