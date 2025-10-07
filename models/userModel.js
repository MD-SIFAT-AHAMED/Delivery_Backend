const db = require("../config/db");

const User = {
  //All user
  getAll: () => db.query("SELECT * FROM users"),

  // new user create
  create: (name, email) =>
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]),

  // one user search by id
  getById: (id) => db.query("SELECT * FROM users WHERE id = ?", [id]),

  // one user delete
  deleteById: (id) => db.query("DELETE FROM users WHERE id = ?", [id]),
};

module.exports = User;
