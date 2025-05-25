// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const nodemailer = require("nodemailer");

const router = express.Router();

// Helper: Create JWT
const createToken = (user, isInstitution = false) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      type: isInstitution ? 'institution' : 'user' 
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: "1h",
    }
  );
};

// 📝 Subscription Registration
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
  } = req.body;

  // Validate required fields - NO password requirement
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
    !declaration
  ) {
    // Log the specific missing fields to help debug
    const missingFields = [];
    if (!institution_name) missingFields.push('institution_name');
    if (!school_address) missingFields.push('school_address');
    if (!affiliation_board) missingFields.push('affiliation_board');
    if (!correspondent_name) missingFields.push('correspondent_name');
    if (!principal_name) missingFields.push('principal_name');
    if (!principal_contact) missingFields.push('principal_contact');
    if (!principal_email) missingFields.push('principal_email');
    if (!school_email) missingFields.push('school_email');
    if (!school_mobile) missingFields.push('school_mobile');
    if (!student_strength) missingFields.push('student_strength');
    if (!teaching_staff_count) missingFields.push('teaching_staff_count');
    if (!declaration) missingFields.push('declaration');
    
    console.log("Missing fields:", missingFields);
    return res
      .status(400)
      .json({ msg: "Please fill all required fields." });
  }

  try {
    // Try a simplified approach directly doing the insert
    const sql = `
      INSERT INTO institutions (
        institution_name, school_address, affiliation_board,
        correspondent_name, principal_name, principal_contact, principal_email,
        branches, school_email, school_website,
        school_mobile, school_landline,
        student_strength, teaching_staff_count, representatives,
        declaration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ msg: "Email already exists. Please use a different one." });
        }
        return res.status(500).json({ msg: "Database error", error: err.message });
      }

      console.log("Institution registered successfully:", result);

      // Get the inserted institution's id
      const institutionId = result.insertId;

      // Set user subscription details and link institution_id for matching users
      db.query(
        `UPDATE users
         SET has_subscription = TRUE,
             subscription_start_date = NOW(),
             subscription_end_date = DATE_ADD(NOW(), INTERVAL 1 YEAR),
             institution_id = ?
         WHERE email = ? OR email = ?`,
        [institutionId, principal_email, school_email],
        (userErr, userResult) => {
          if (userErr) {
            console.error("Failed to update user subscription:", userErr);
            // Still return success for institution registration
            return res.json({
              msg: "Subscription registered successfully, but failed to update user subscription.",
            });
          }
          res.json({
            msg: "Subscription registered successfully.",
            subscription_updated: userResult.affectedRows > 0
          });
        }
      );
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// 👤 User Registration
router.post("/user/register", async (req, res) => {
  console.log("Registering user:", req.body);
  const { firstname, lastname, email, password, phone_number } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !password || !phone_number) {
    return res
      .status(400)
      .json({ msg: "Please provide firstname, lastname, email, password, and phone number" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (firstname, lastname, email, password, phone_number) VALUES (?, ?, ?, ?, ?)`;
    const values = [firstname, lastname, email, hashedPassword, phone_number];

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
        msg: "User registered successfully. You can now log in.",
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// 🔑 User Login
router.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
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

      const token = createToken(user, false);

      // Check if subscription is valid (not expired)
      const hasValidSubscription = user.has_subscription && 
        user.subscription_end_date && 
        new Date(user.subscription_end_date) > new Date();

      res.json({
        msg: "Login successful",
        token,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone_number: user.phone_number,
          type: 'user',
          has_subscription: hasValidSubscription,
          subscription_end_date: user.subscription_end_date
        },
      });
    }
  );
});

// Update institution login to handle null passwords
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
      
      // Check if the institution has a password set
      if (!user.password) {
        return res.status(401).json({ 
          msg: "No password set for this institution. Please contact support." 
        });
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({ msg: "Invalid password." });
      }

      const token = createToken(user, true);

      res.json({
        msg: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.institution_name,
          email: user.principal_email,
          type: 'institution'
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
  const resetLink = `http://edsurance.in/reset-password/${token}`;

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

// Add user forgot password route
router.post("/user/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ msg: "Email is required." });

  const token = jwt.sign({ email, type: 'user' }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const resetLink = `http://edsurance.in/reset-password/${token}`;

  db.query(
    "UPDATE users SET reset_token = ?, reset_expires = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE email = ?",
    [token, email],
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

// Add user reset password route
router.post("/user/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ msg: "Password is required." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    
    if (decoded.type !== 'user') {
      return res.status(400).json({ msg: "Invalid token type" });
    }
    
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      `UPDATE users
       SET password = ?, reset_token = NULL, reset_expires = NULL
       WHERE email = ? AND reset_token = ? AND reset_expires > NOW()`,
      [hashed, email, token],
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
