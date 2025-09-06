// Inside your blood request route
const express = require('express');
const router = express.Router();
const db = require("../config/db"); 

// POST /api/blood-request
router.post('/', (req, res) => {
  const { hospital_id, blood_group, quantity } = req.body;

  // Insert the blood request
  const insertSql = 'INSERT INTO blood_requests (hospital_id, blood_group, quantity) VALUES (?, ?, ?)';
  db.query(insertSql, [hospital_id, blood_group, quantity], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to request blood' });

    // Find matching donors
    const selectDonorsSql = 'SELECT id FROM users WHERE role = "donor" AND blood_group = ?';
    db.query(selectDonorsSql, [blood_group], (err, donors) => {
      if (err) return res.status(500).json({ error: 'Failed to find donors' });

      // Send notification to each donor
      const notifSql = 'INSERT INTO notifications (user_id, message) VALUES ?';
      const notifValues = donors.map(donor => [donor.id, `Urgent need for ${blood_group} blood`]);

      if (notifValues.length > 0) {
        db.query(notifSql, [notifValues], (err) => {
          if (err) console.error('Failed to insert notifications', err);
        });
      }

      res.json({ message: 'Blood request created and notifications sent' });
    });
  });
});

module.exports = router;
