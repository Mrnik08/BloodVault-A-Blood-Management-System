const express = require("express");
const { getHospitals } = require("../Controllers/hospitalController");

const router = express.Router();

router.get("/", getHospitals);

module.exports = router;
