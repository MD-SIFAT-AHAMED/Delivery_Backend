const { json } = require("express");
const db = require("../config/db");
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
exports.getAllAdmin = async (req, res) => {
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

// Get all parcels
exports.getAllParcels = async (req, res) => {
  try {
    const data = await Admin.getAllParcel();
    res.status(200).json({
      success: true,
      message: "All Parcels Records",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Get All Parcel list API",
      error: error.message,
    });
  }
};

// Aprrpve Rider
exports.approveRider = async (req, res) => {
  const { userEmail } = req.body;
  let conn;
  try {
    conn = await db.getConnection();
    await conn.beginTransaction();
    //Update user role
    await Admin.putUserRole(conn, userEmail);
    // Update rider application status
    await Admin.putRiderStatusApproved(conn, userEmail);

    // All ok then commit
    await conn.commit();
    conn.release();

    res.status(200).json({
      success: true,
      message: "User role & Rider status update successfuly",
    });
  } catch (error) {
    if (conn) {
      await conn.rollback();
      conn.release();
    }

    res.status(500).json({
      success: false,
      message: "Approve failed",
      error: error.message,
    });
  }
};

// Reject Rider
exports.rejectRider = async (req, res) => {
  const { userEmail } = req.body;
  try {
    await Admin.putRiderStatusReject(userEmail);

    res.status(200).json({
      success: true,
      message: "Rider status update successfuly",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Rider Reject Failed",
      error: error.message,
    });
  }
};

// Delete Rider Application
exports.deleteRider = async (req, res) => {
  const { userEmail } = req.query;
  try {
    await Admin.deleteRiderAppication(userEmail);
    res.status(200).json({
      success: true,
      message: "Rider Application delete successfuly",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Rider Appication delete Failed",
    });
  }
};

exports.getRiderInfo = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const result = await Admin.getRiderInfo(userEmail);
    res.status(200).json({
      success: true,
      message: "Get Rider info successfuly",
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

exports.getuserInfo = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const result = await Admin.getUserInfo(userEmail);
    res.status(200).json({
      success: true,
      message: "Get User info successfully",
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

exports.deleteUser = async (req, res) => {
  const { userEmail } = req.query;
  try {
    await Admin.deleteUser(userEmail);
    res.status(200).json({
      success: true,
      message: "Delete User successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getParcelInfo = async (req, res) => {
  const { trakingId } = req.query;
  try {
    const data = await Admin.getParcleInfo(trakingId);
    res.status(200).json({
      success: true,
      message: "Get Parcle info successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteParcel = async (req, res) => {
  const { trakingId } = req.query;
  try {
    await Admin.deleteParcel(trakingId);
    res.status(200).json({
      success: true,
      message: "Parcel delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
