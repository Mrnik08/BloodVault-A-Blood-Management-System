const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Fetch all blood stock
router.get("/", (req, res) => {
    db.query("SELECT * FROM blood_stock", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Add new blood stock entry
router.post("/add", (req, res) => {
    const { blood_group, units_available } = req.body;

    db.query(
        "INSERT INTO blood_stock (blood_group, units_available) VALUES (?, ?) ON DUPLICATE KEY UPDATE units_available = units_available + ?",
        [blood_group, units_available, units_available],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Blood stock updated successfully!" });
        }
    );
});

// ✅ Update blood stock
router.put("/update", (req, res) => {
    const { blood_group, units_available } = req.body;

    db.query(
        "UPDATE blood_stock SET units_available = ? WHERE blood_group = ?",
        [units_available, blood_group],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.affectedRows > 0) {
                res.json({ message: "Stock updated successfully!" });
            } else {
                res.status(404).json({ error: "Blood group not found!" });
            }
        }
    );
});

// ✅ Delete blood stock entry
router.delete("/delete/:blood_group", (req, res) => {
    const { blood_group } = req.params;
    const sql = "DELETE FROM blood_stock WHERE blood_group = ? AND units_available = 0";

    db.query(
        "DELETE FROM blood_stock WHERE blood_group = ?",
        [blood_group],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.affectedRows > 0) {
                res.json({ message: "Stock deleted successfully!" });
            } else {
                res.status(404).json({ error: "Blood group not found!" });
            }
        }
    );
});

module.exports = router;
