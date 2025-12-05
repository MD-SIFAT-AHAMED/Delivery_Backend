const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mySqlPool = require("./src/config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Test Route
app.get("/", (req, res) => {
  res.send("Delivery Web App Backend Running...");
});

// Routes
app.use("/api/v1/users", require("./src/routes/userRoute"));
app.use("/api/v1/riders", require("./src/routes/riderRoute"));
app.use("/api/v1/admin", require("./src/routes/adminRoute"));
app.use("/api/v1/auth", require("./src/routes/authRoute"));
app.use("/api/v1/payment", require("./src/routes/paymentRoute"));

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
