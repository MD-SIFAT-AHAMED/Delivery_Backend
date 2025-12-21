const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

const mySqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  ssl: {
    ca: fs.readFileSync(process.env.CA),
  },
});

mySqlPool.getConnection((err, connection) => {
  if (err) {
    console.log("MYSQL Connection Failed:", err);
  } else {
    console.log("MYSQL Connected Successfully!");
    connection.release();
  }
});

module.exports = mySqlPool.promise();
