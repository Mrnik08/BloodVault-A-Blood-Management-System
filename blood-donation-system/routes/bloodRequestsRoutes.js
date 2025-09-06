const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Create a new blood request
router.post("/request", (req, res) => {
    console.log("Received request:", req.body); // Debugging Log

    const { name, phone, blood_group, hospital, reason, quantity } = req.body;

    if (!name || !phone || !blood_group || !hospital || !reason || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO blood_requests (name, phone, blood_group, hospital, reason, quantity, status) VALUES (?, ?, ?, ?, ?, ?, 'Pending')";

    db.query(sql, [name, phone, blood_group, hospital, reason, quantity], (err, result) => {
        if (err) {
            console.error("Database Error:", err); // Debugging Log
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(201).json({ message: "Blood request submitted successfully!" });
        
    });
});


// Fetch all pending blood requests
router.get("/requests", (req, res) => {
    db.query("SELECT * FROM blood_requests WHERE status = 'Pending'", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Mark a blood request as fulfilled
router.put("/request/fulfill/:id", (req, res) => {
    const { id } = req.params;
    db.query("UPDATE blood_requests SET status='Fulfilled' WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Request marked as fulfilled!" });
    });
});

module.exports = router;
