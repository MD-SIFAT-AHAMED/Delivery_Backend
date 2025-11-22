const db = require("../config/db");

const User = {
  
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
