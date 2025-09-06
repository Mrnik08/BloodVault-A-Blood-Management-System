const db = require("../config/db");

// Add blood stock
exports.addBloodStock = (req, res) => {
    const { hospital_id, blood_type, quantity } = req.body;

    if (!hospital_id || !blood_type || !quantity) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const sql = `INSERT INTO blood_stock (hospital_id, blood_type, quantity) VALUES (?, ?, ?)`;
    db.query(sql, [hospital_id, blood_type, quantity], (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Blood stock added successfully!" });
    });
};

// Get blood stock
exports.getBloodStock = (req, res) => {
    const sql = "SELECT * FROM blood_stock";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};
