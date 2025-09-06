// routes/contact.js
const express = require('express');
const router = express.Router();
const db = require("../config/db"); // make sure this connects your MySQL

// POST: Receive contact message
router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", err });
    res.json({ message: "Message saved" });
  });
});

// GET: Admin fetch all messages
router.get("/", (req, res) => {
  db.query("SELECT * FROM contact_messages ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database fetch error" });
    res.json(results);
  });
});

module.exports = router;
