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
  const { status } = req.query;
  try {
    const data = await Admin.getAllRiderApplications(status);
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
  const { delivery_status, payment_status, region } = req.query;
  console.log(delivery_status, payment_status, region);
  try {
    const data = await Admin.getAllParcel(
      delivery_status,
      payment_status,
      region
    );
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

exports.patchStatusUpdate = async (req, res) => {
  const { id } = req.params;
  const { delivery_status } = req.body;
  try {
    await Admin.pathcStatusUpdate(delivery_status, id);
    res.status(200).json({
      success: true,
      message: "Patch update Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const result = await Admin.getPaymentHistory();
    res.status(200).json({
      success: true,
      message: "Get All Payment History Successfully",
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

exports.getTotalSummary = async (req, res) => {
  try {
    const result = await Admin.getTotalSummary();
    res.status(200).json({
      success: true,
      message: "Get Total Summary Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Problem",
      error: error.message,
    });
  }
};
// assigned_rider_id
exports.getApproveRider = async (req, res) => {
  try {
    const result = await Admin.getApproveRider();
    res.status(200).json({
      success: true,
      message: "Get Approve rider Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Problem",
      error: error.message,
    });
  }
};
exports.patchAssignRider = async (req, res) => {
  const { riderId } = req.body;
  const { parcelId } = req.params;
  console.log(riderId, parcelId);
  try {
    const result = await Admin.patchAssignRider(riderId, parcelId);
    res.status(200).json({
      success: true,
      message: "Patch Assign rider Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Problem",
      error: error.message,
    });
  }
};
