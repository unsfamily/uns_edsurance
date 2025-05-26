const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import the auth router - add logging to confirm it loaded
const authRoutes = require("./routes/auth");
console.log("Auth routes imported:", Object.keys(authRoutes));

const app = express();

// Simple CORS configuration - no credentials
app.use(
  cors({
    origin: "https://school.edsurance.in",
  })
);

// Add request logging to debug routing issues
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} received`
  );
  next();
});

app.use(express.json());

// Add a super basic test route before any router
app.get("/basic-test", (req, res) => {
  res.json({ msg: "Basic test route works!" });
});

// Register auth routes under /api/auth with logging
console.log("About to mount auth routes at /api/auth");
app.use("/api/auth/user", authRoutes);
app.use("/api/contact", require("./routes/contact")); // 👈 Add this
console.log("Auth routes mounted", Object.keys(authRoutes));

// Test root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Add a test route directly in server.js to check if server responds at all
app.post("/test-endpoint", (req, res) => {
  res.json({ msg: "Test endpoint working!" });
});

// Add a direct test route that bypasses the router to test subscription registration
app.post("/api/direct-subscription-register", (req, res) => {
  console.log("Direct subscription endpoint hit:", req.body);
  res.json({ msg: "Direct subscription endpoint working!" });
});

// Add a test route that's similar to the one in auth.js but directly in server.js
app.post("/api/server-test-auth", (req, res) => {
  console.log("Server direct auth test route hit");
  res.json({ msg: "Server direct auth test route works!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
