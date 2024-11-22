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
router.get("/currentUser", currentUser);

//Apply Doctor || POST
router.post("/apply-doctor", applyDoctor);

//GET ALL DOC
router.get("/getAllDoctors", getAllDocotrs);

//BOOK APPOINTMENT
router.post("/book-appointment", bookeAppointmnet);

//Appointments List
router.get("/user-appointments", userAppointments);

//Check Availability
router.get("/checkAvailability", bookingAvailability);

//Medication Download
router.get("/medicationDownload", downloadMedication);

//Insuarance
router.get("/insurance", isInsurance);


module.exports = router;
