const express = require('express');
const router = express.Router();
const hospitalController = require('./hospitalsControllers');
router.post("/getHospitals",hospitalController.getHospitals);  
module.exports = router;        