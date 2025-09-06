const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get blood availability
router.get("/", (req, res) => {
    db.query("SELECT * FROM blood_stock", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update blood stock after request fulfillment
router.post("/update", (req, res) => {
    const { blood_group, quantity } = req.body;
    db.query(
        "UPDATE blood_stock SET units_available = units_available - ? WHERE blood_group = ? AND units_available >= ?",
        [quantity, blood_group, quantity],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.affectedRows > 0) {
                res.json({ message: "Stock updated successfully" });
            } else {
                res.status(400).json({ error: "Not enough stock available" });
            }
        }
    );
});

module.exports = router;
