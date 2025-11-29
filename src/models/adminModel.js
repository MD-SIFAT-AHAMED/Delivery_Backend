const db = require("../config/db");

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
  // Update rider Application status
  putRiderStatus: async (conn, userEmail) => {
    await conn.query(
      `
        UPDATE rider_applications
        SET status = "approved"
        WHERE email = ?
        `,
      [userEmail]
    );
  },
};

module.exports = Admin;
