const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Simple CORS configuration - no credentials
app.use(
  cors({
    origin: "http://edsurance.in",
  })
);

app.use(express.json());

// Register auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Test root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Add a test route directly in server.js to check if server responds at all
app.post("/test-endpoint", (req, res) => {
  res.json({ msg: "Test endpoint working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
