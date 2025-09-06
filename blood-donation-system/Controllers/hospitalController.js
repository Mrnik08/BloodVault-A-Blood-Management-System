const db = require("../config/db");

// Get list of hospitals
exports.getHospitals = (req, res) => {
    const sql = "SELECT id, name, email, phone FROM users WHERE role = 'hospital'";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};
