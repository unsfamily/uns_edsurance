// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const nodemailer = require("nodemailer");

const router = express.Router();

// Helper: Create JWT
const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// 📝 Register
router.post("/register", async (req, res) => {
  console.log("Registering institution:", req.body);
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
    password,
  } = req.body;

  // Validate required fields
  if (
    !institution_name ||
    !school_address ||
    !affiliation_board ||
    !correspondent_name ||
    !principal_name ||
    !principal_contact ||
    !principal_email ||
    !school_email ||
    !school_mobile ||
    !student_strength ||
    !teaching_staff_count ||
    !declaration ||
    !password
  ) {
    return res
      .status(400)
      .json({ msg: "Please fill all required fields including password." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO institutions (
        institution_name, school_address, affiliation_board,
        correspondent_name, principal_name, principal_contact, principal_email,
        branches, school_email, school_website,
        school_mobile, school_landline,
        student_strength, teaching_staff_count, representatives,
        declaration, password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      hashedPassword,
    ];

    db.query(sql, values, (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ msg: "Email already exists. Please use a different one." });
        }
        return res.status(500).json({ msg: "Database error", err });
      }

      res.json({
        msg: "Institution registered successfully. You can now log in.",
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// 🔐 Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM institutions WHERE principal_email = ? OR school_email = ?",
    [email, email],
    async (err, result) => {
      if (err || result.length === 0) {
        return res
          .status(400)
          .json({ msg: "Invalid email or user not found." });
      }

      const user = result[0];
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({ msg: "Invalid password." });
      }

      const token = createToken(user);

      res.json({
        msg: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.institution_name,
          email: user.principal_email,
        },
      });
    }
  );
});

// 📧 Forgot Password
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ msg: "Email is required." });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const resetLink = `http://localhost:3000/reset-password/${token}`;

  db.query(
    "UPDATE institutions SET reset_token = ?, reset_expires = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE principal_email = ? OR school_email = ?",
    [token, email, email],
    (err, result) => {
      if (err || result.affectedRows === 0) {
        return res
          .status(400)
          .json({ msg: "Email not found or update failed." });
      }

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
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
      };

      transporter.sendMail(mailOptions, (mailErr) => {
        if (mailErr) {
          console.error(mailErr);
          return res.status(500).json({ msg: "Email send failed" });
        }
        res.json({ msg: "Reset link sent to your email." });
      });
    }
  );
});

// 🔁 Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ msg: "Password is required." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      `UPDATE institutions
       SET password = ?, reset_token = NULL, reset_expires = NULL
       WHERE (principal_email = ? OR school_email = ?) AND reset_token = ? AND reset_expires > NOW()`,
      [hashed, email, email, token],
      (err, result) => {
        if (err || result.affectedRows === 0) {
          return res.status(400).json({ msg: "Invalid or expired token" });
        }
        res.json({ msg: "Password has been reset successfully." });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: "Token is invalid or expired." });
  }
});

module.exports = router;
