const db = require("../config/db");

const User = {
  
  //All user
  getAll: () => db.query("SELECT * FROM users"),

  // new user create
  create: (name, email, address, role, is_active) =>
    db.query(
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
    return rows[0];
  },

  // one user delete
  deleteById: (id) => db.query("DELETE FROM users WHERE id = ?", [id]),
};

module.exports = User;
