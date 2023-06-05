const express = require("express");

const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

const validateToken = require("../middlewares/validateTokenHandler");

const {
  applyDoctor,
  getAllDoctors,
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
router.get("/getAllDoctors", getAllDoctors);

//BOOK APPOINTMENT
router.post("/book-appointment", bookeAppointmnet);

//Appointments List
router.get("/user-appointments", userAppointments);

//Check Availability
router.get("/checkAvailability", bookingAvailability);

//Medication Download
router.get("/medicationDownload", downloadMedication);

module.exports = router;
