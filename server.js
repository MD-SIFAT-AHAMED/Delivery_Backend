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
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res.send("Delivery Web App Backend Running...");
});

// Routes
app.use("/api/v1/users", require("./src/routes/userRoutes"));
app.use("/api/v1/riders", require("./src/routes/riderRoutes"));
// app.use("/api/v1/riders", require("./routes/riderRoutes"));
// app.use("/api/v1/parcels", require("./routes/parcelRoutes"));

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
