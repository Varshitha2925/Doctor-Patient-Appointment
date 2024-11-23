const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  doctorAppointmentsController,
  updateStatusController,
  multipleCommentsController,
  totalFeeCalculator,
  postMedication,
} = require("../controllers/doctorController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", updateProfileController);

//GET Appointments
router.get("/doctor-appointments", doctorAppointmentsController);

//POST Update Status
router.post("/update-status", updateStatusController);

//POST Update Comments
router.post("/update-comments", multipleCommentsController);

//GET total fee
router.get("/totalFee", totalFeeCalculator);

//POST medication
router.post("/postMedication", postMedication);

module.exports = router;
