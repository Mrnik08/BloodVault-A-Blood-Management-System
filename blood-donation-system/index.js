const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { createUsersTable } = require("./models/user");
const hospitalRoutes = require("./routes/hospitalRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestsRoutes");
const donationRoutes = require("./routes/donationRoutes");
const bloodAvailabilityRoutes = require("./routes/bloodAvailabilityRoutes");
const bloodStockRoutes = require("./routes/bloodStockRoutes");

//const notificationRoutes = require("./routes/notificationRoutes");
const contactRoutes = require("./routes/contactRoutes");
// const bloodStock=require("./routes/bloodStock");

//const bloodRequestsRoutes=require("./routes/bloodRequestsRoutes");





dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create tables
createUsersTable();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/blood-stock", bloodStockRoutes);
app.use("/api/", donationRoutes); // Mount the donation routes
app.use("/api/hospital/dashboard", hospitalRoutes); // Hospital Dashboard

app.use("/api/blood",bloodRequestRoutes);
app.use("/api/blood-availability", bloodAvailabilityRoutes);
//app.use("/api/notifications", notificationRoutes);
app.use("/api/hospital/dashboard", hospitalRoutes);
//app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);
// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

