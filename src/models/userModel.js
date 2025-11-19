const db = require("../config/db");

const User = {
  //All user
  getAll: async (search) => {
    if (search && search.length > 0) {
      console.log("Executing Search Query with terms:", search);
      let [row] = await db.query(
      `
      SELECT * FROM users
     WHERE LOWER(name) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?)
      ORDER BY id DESC
      `,
        [`%${search}%`, `%${search}%`]
      );
      return row;
    } else {
      const [row] = await db.query(`
        SELECT * FROM users
        ORDER BY id DESC
        `);
      return row;
    }
  },

  // new user create
  create: async (name, email, address, role, is_active) =>
    await db.query(
      `
      INSERT INTO users
      (name,email,address,role,is_active)
      VALUES(?,?,?,?,?)`,
      [name, email, address, role, is_active]
    ),

  // One user search by email
  GetByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  // One user search by Id
  GetById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    console.log("Rows:", rows);
    return rows[0];
  },

  // one user delete
  deleteById: (id) => db.query("DELETE FROM users WHERE id = ?", [id]),
};

module.exports = User;
