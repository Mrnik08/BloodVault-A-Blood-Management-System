const express = require("express");
const router = express.Router();
const db = require("../config/db");


// Register Donor
router.post("/donate", (req, res) => {
    const { name, phone, blood_group, address, last_donation } = req.body;
    const sql = "INSERT INTO donors (name, phone, blood_group, address, last_donation) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, phone, blood_group, address, last_donation], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Donation Registered Successfully!" });
    });
});

// Fetch Blood Requests
router.get("/requests", (req, res) => {
    db.query("SELECT * FROM blood_requests WHERE status = 'Pending'", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Accept Blood Request
router.post("/request/accept", (req, res) => {
    const { donor_id, request_id } = req.body;
    db.query("UPDATE blood_requests SET status='Fulfilled' WHERE id=?", [request_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Request Accepted Successfully!" });
    });
});

module.exports = router;