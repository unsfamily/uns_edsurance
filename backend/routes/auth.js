const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// 🔐 Helper: Create JWT
const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

// 📝 Register (only basic user info)
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, phone_number } = req.body;
  if (!firstname || !lastname || !email || !password || !phone_number)
    return res.status(400).json({ msg: "All fields are required" });

  const fullName = `${firstname} ${lastname}`.trim();
  console.log("Registering user:", fullName, email);
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, users) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      if (users.length > 0)
        return res.status(400).json({ msg: "Email already registered" });

      const hashed = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?)",
        [fullName, email, hashed, phone_number],
        (err2) => {
          if (err2)
            return res
              .status(500)
              .json({ msg: "Registration failed", err: err2 });
          res.json({ msg: "Registered successfully" });
        }
      );
    }
  );
});

// 🔐 Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, users) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      if (users.length === 0)
        return res.status(400).json({ msg: "User not found" });

      const valid = await bcrypt.compare(password, users[0].password);
      if (!valid) return res.status(400).json({ msg: "Invalid password" });

      const token = createToken(users[0]);
      res.json({
        token,
        user: {
          id: users[0].id,
          name: users[0].name,
          email: users[0].email,
          is_subscribed: users[0].is_subscribed,
        },
      });
    }
  );
});

// 💳 Subscribe + Institution info update
router.post("/subscribe", verifyToken, (req, res) => {
  const userId = req.user.id;

  const {
    institution_name,
    school_address,
    affiliation_board,
    correspondent_name,
    principal_name,
    principal_contact,
    principal_email,
    branches,
    school_email,
    school_website,
    school_mobile,
    school_landline,
    student_strength,
    teaching_staff_count,
    representatives,
    declaration,
  } = req.body;

  // Prevent resubscription
  db.query(
    "SELECT is_subscribed FROM users WHERE id = ?",
    [userId],
    (err, rows) => {
      if (err)
        return res.status(500).json({ msg: "Error checking subscription" });
      if (rows[0]?.is_subscribed === 1) {
        return res.status(400).json({ msg: "You have already subscribed" });
      }

      const sql = `
      UPDATE users SET
        institution_name = ?, school_address = ?, affiliation_board = ?,
        correspondent_name = ?, principal_name = ?, principal_contact = ?, principal_email = ?,
        branches = ?, school_email = ?, school_website = ?,
        school_mobile = ?, school_landline = ?,
        student_strength = ?, teaching_staff_count = ?, representatives = ?,
        declaration = ?, is_subscribed = 1
      WHERE id = ?
    `;

      const values = [
        institution_name,
        school_address,
        affiliation_board,
        correspondent_name,
        principal_name,
        principal_contact,
        principal_email,
        branches,
        school_email,
        school_website,
        school_mobile,
        school_landline,
        student_strength,
        teaching_staff_count,
        representatives,
        declaration ? 1 : 0,
        userId,
      ];

      db.query(sql, values, (err2) => {
        if (err2) {
          if (err2.code === "ER_DUP_ENTRY") {
            return res
              .status(409)
              .json({ msg: "Duplicate contact or email exists" });
          }
          return res
            .status(500)
            .json({ msg: "Subscription failed", err: err2 });
        }
        res.json({ msg: "Subscription successful" });
      });
    }
  );
});

// 📧 Forgot Password
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetLink = `https://school.edsurance.in/reset-password/${token}`;
  db.query(
    "UPDATE users SET reset_token = ?, reset_expires = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE email = ?",
    [token, email]
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset - UNS",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return res.status(500).json({ msg: "Email failed to send" });
    res.json({ msg: "Reset link sent to email" });
  });
});

// 🔁 Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE email = ? AND reset_token = ? AND reset_expires > NOW()",
      [hashed, decoded.email, token],
      (err, result) => {
        if (err || result.affectedRows === 0)
          return res.status(400).json({ msg: "Invalid or expired token" });

        res.json({ msg: "Password updated successfully" });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }
});

router.get("/me", verifyToken, (req, res) => {
  const userId = req.user.id;
  db.query(
    "SELECT id, name, email, is_subscribed FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err || result.length === 0)
        return res.status(500).json({ msg: "Error fetching user profile" });
      res.json(result[0]);
    }
  );
});

// backend/routes/auth.js
router.post("/change-password", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  db.query(
    "SELECT password FROM users WHERE id = ?",
    [userId],
    async (err, result) => {
      if (err || result.length === 0)
        return res.status(400).json({ msg: "User not found" });

      const valid = await bcrypt.compare(currentPassword, result[0].password);
      if (!valid)
        return res.status(400).json({ msg: "Current password is incorrect" });

      const hashed = await bcrypt.hash(newPassword, 10);
      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashed, userId],
        (err2) => {
          if (err2)
            return res.status(500).json({ msg: "Password update failed" });
          res.json({ msg: "Password updated successfully" });
        }
      );
    }
  );
});

module.exports = router;
