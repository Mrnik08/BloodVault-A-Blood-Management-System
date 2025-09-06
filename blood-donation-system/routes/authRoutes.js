const express = require("express");
const { register, login } = require("../Controllers/authController");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();



router.post("/register", register);
router.post("/login", login);

// Middleware to verify token
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access Denied" });
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };

  // Fetch logged-in user details
router.get("/user", authMiddleware, (req, res) => {
    db.query("SELECT id, name, email FROM users WHERE id = ?", [req.user.id], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });
      res.json(results[0]);
    });
  });

module.exports = router;
