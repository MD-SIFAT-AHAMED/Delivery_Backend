const db = require("../config/db");
const { deleteRider } = require("../controllers/adminController");

const Admin = {
  //All user ahow
  getAll: async (search) => {
    if (search && search.length > 0) {
      let [row] = await db.query(
        `
          SELECT * FROM users
         WHERE (LOWER(name) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?))
          AND role = "user"
          ORDER BY id DESC
          `,
        [`%${search}%`, `%${search}%`]
      );
      return row;
    } else {
      const [row] = await db.query(`
            SELECT * FROM users
            WHERE role = "user"
            ORDER BY id DESC
            `);
      return row;
    }
  },

  // All rider application
  getAllRiderApplications: async () => {
    const [row] = await db.query(`
      SELECT *
      FROM rider_applications
      WHERE status = "pending"
      ORDER BY id
      `);
    return row;
  },

  // All Admin list
  getAllAdmin: async () => {
    const [row] = await db.query(`
      SELECT *
      FROM users
      where role = "admin"
      ORDER BY id
      `);
    return row;
  },

  // All Parcel list
  getAllParcel: async () => {
    const [row] = await db.query(`
      SELECT *
      FROM parcels
      ORDER BY id
      `);
    return row;
  },

  // Update user role
  putUserRole: async (conn, userEmail) => {
    await conn.query(
      `
      UPDATE users
      SET role = "rider"
      WHERE email = ?
      `,
      [userEmail]
    );
  },

  // Update rider Application status is approve
  putRiderStatusApproved: async (conn, userEmail) => {
    await conn.query(
      `
        UPDATE rider_applications
        SET status = "approved"
        WHERE email = ?
        `,
      [userEmail]
    );
  },

  // Update rider application Status is rejected
  putRiderStatusReject: async (userEmail) => {
    await db.query(
      `
      UPDATE rider_applications
      SET status = "rejected"
      WHERE email = ?
      `,
      [userEmail]
    );
  },

  // Delete rider appicaiton
  deleteRiderAppication: async (userEmail) => {
    await db.query(
      `
      DELETE FROM rider_applications
      WHERE email = ?
      `,
      [userEmail]
    );
  },

  // Get single rider info
  getRiderInfo: async (userEmail) => {
    const [row] = await db.query(
      `
      SELECT name, email, region, contact, nid, license, status, applied_date, update_at, age
      FROM rider_applications
      WHERE email = ?
      limit 1
      `,
      [userEmail]
    );
    return row;
  },

  //Get singler user info
  getUserInfo: async (userEmail) => {
    const [row] = await db.query(
      `
      SELECT name, email, address, role, is_active, create_at, update_at
      FROM users
      WHERE email = ?
    `,
      [userEmail]
    );
    return row;
  },

  // Delete user
  deleteUser: async (userEmail) => {
    await db.query(
      `
      DELETE FROM users
      WHERE email = ?
      `,
      [userEmail]
    );
  },

  // Parcel info
  getParcleInfo: async (trakingId) => {
    const [row] = await db.query(
      `
      SELECT trackingId, title, type, weight, cost, senderName, senderContact, senderRegion, senderCenter, senderAddress, pickupInstruction, receiverName, receiverContact, receiverRegion, receiverCenter, receiverAddress, deliveryInstruction, created_by, delivery_status, payment_status, created_at, updated_at
      FROM parcels
      WHERE trackingId = ?
      `,
      [trakingId]
    );
    return row;
  },

  // Delete parcle
  deleteParcel: async (trakingId) => {
    await db.query(
      `
      DELETE FROM parcels
      WHERE trackingId = ?
      `,
      [trakingId]
    );
  },
};

module.exports = Admin;
