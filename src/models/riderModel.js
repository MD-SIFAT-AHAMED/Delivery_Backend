const db = require("../config/db");

const rider = {
  // Rider application
  postRider: async (
    user_id,
    name,
    age,
    email,
    region,
    contact,
    nid,
    license
  ) => {
    const [result] = await db.query(
      `
        INSERT INTO rider_applications
        (user_id, name, age, email, region, contact, nid, license)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [user_id, name, age, email, region, contact, nid, license]
    );
    return result;
  },

  // Get all applications
  getAll: async () => {
    const [rows] = await db.query(
      "SELECT * FROM rider_applications ORDER BY applied_date DESC"
    );
    return rows;
  },

  // Get single application by id
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM rider_applications WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // Update application status (approve/reject)
  updateStatus: async (id, status, remarks = null) => {
    const [result] = await db.query(
      `
      UPDATE rider_applications 
      SET status = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [status, remarks, id]
    );
    return result;
  },

  // Delete application
  deleteById: async (id) => {
    const [result] = await db.query(
      "DELETE FROM rider_applications WHERE id = ?",
      [id]
    );
    return result;
  },
};

module.exports = rider;
