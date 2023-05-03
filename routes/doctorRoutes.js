const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  doctorAppointmentsController,
  updateStatusController,
  multipleCommentsController,
  totalFeeCalculator,
} = require("../controllers/doctorController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", validateToken, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", validateToken, updateProfileController);

//GET Appointments
router.get("/doctor-appointments", validateToken, doctorAppointmentsController);

//POST Update Status
router.post("/update-status", validateToken, updateStatusController);

//POST Update Comments
router.post("/update-comments", validateToken, multipleCommentsController);

//GET total fee
router.get("/totalFee", validateToken, totalFeeCalculator);

module.exports = router;
