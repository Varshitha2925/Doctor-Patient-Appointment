const express = require("express");

const {
  registerUser,
  loginUser,
  currentUser,
  isInsurance,
} = require("../controllers/userController");

const validateToken = require("../middlewares/validateTokenHandler");

const {
  applyDoctor,
  getAllDocotrs,
  bookeAppointmnet,
  bookingAvailability,
  userAppointments,
  downloadMedication,
} = require("../controllers/userController");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginUser);

//REGISTER || POST
router.post("/register", registerUser);

//Auth || POST
router.get("/currentUser", validateToken, currentUser);

//Apply Doctor || POST
router.post("/apply-doctor", validateToken, applyDoctor);

//GET ALL DOC
router.get("/getAllDoctors", validateToken, getAllDocotrs);

//BOOK APPOINTMENT
router.post("/book-appointment", validateToken, bookeAppointmnet);

//Appointments List
router.get("/user-appointments", validateToken, userAppointments);

//Check Availability
router.get("/checkAvailability", validateToken, bookingAvailability);

//Medication Download
router.get("/medicationDownload", validateToken, downloadMedication);

//Insuarance
router.get("/insurance", validateToken, isInsurance);


module.exports = router;
