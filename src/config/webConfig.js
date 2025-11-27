const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  FRONTEND_URL: process.env.FRONTEND_URL,
  // Payment realated Config
  store_id: process.env.Store_ID,
  store_passwd: process.env.Store_Password,
  is_live: false, //true for live, false for sandbox
};
