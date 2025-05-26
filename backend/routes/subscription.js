const express = require("express");
const router = express.Router();
const db = require("../db");
// const auth = require('../middleware/auth');
const verifyToken = require("../middleware/authMiddleware");
// Subscribe a user - requires authentication
router.post("/subscribe", auth, (req, res) => {
  const userId = req.user.id;

  // Calculate subscription end date (e.g., 1 year from now)
  const startDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  const sql = `
    UPDATE users 
    SET has_subscription = TRUE,
        subscription_start_date = ?,
        subscription_end_date = ?
    WHERE id = ?
  `;

  db.query(sql, [startDate, endDate, userId], (err, result) => {
    if (err) {
      console.error("Subscription update error:", err);
      return res.status(500).json({ msg: "Failed to update subscription" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      msg: "Subscription activated successfully",
      has_subscription: true,
      subscription_end_date: endDate,
    });
  });
});

// Check subscription status
router.get("/status", auth, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT has_subscription, subscription_end_date FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Failed to check subscription status" });
      }

      if (result.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      const user = result[0];
      const hasValidSubscription =
        user.has_subscription &&
        user.subscription_end_date &&
        new Date(user.subscription_end_date) > new Date();

      res.json({
        has_subscription: hasValidSubscription,
        subscription_end_date: user.subscription_end_date,
      });
    }
  );
});

module.exports = router;
