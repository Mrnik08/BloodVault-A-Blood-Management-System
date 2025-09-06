const db = require("../config/db");

// Create users table (Donor & Hospital)
const createUsersTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(15) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('donor', 'hospital') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    db.query(sql, (err) => {
        if (err) throw err;
        console.log("Users Table Created!");
    });
};

module.exports = { createUsersTable };

const createBloodStockTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS blood_stock (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hospital_id INT NOT NULL,
        blood_type ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-') NOT NULL,
        quantity INT NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hospital_id) REFERENCES users(id) ON DELETE CASCADE
    )`;
    db.query(sql, (err) => {
        if (err) throw err;
        console.log("Blood Stock Table Created!");
    });
};

module.exports = { createUsersTable, createBloodStockTable };
