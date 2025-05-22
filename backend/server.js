const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Register auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Test root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// ❌ REMOVE this duplicate route:
// app.post("/api/auth/register", ...)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
