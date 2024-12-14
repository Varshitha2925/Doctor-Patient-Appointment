const express = require("express");

const {
  registerUser,
  loginUser,
  currentUser,
  getTodaysAppointments,
  updateAppointmentComments,
} = require("../controllers/userController");

const validateToken = require("../middlewares/validateTokenHandler");

const {
  applyDoctor,
  getAllDocotrs,
  bookeAppointmnet,
  bookingAvailability,
  userAppointments,
  downloadMedication,
  cancelAppointment,
  paymentController,
  assigndoctor,reschedule,nurseAppointments
} = require("../controllers/userController");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginUser);

//REGISTER || POST
router.post("/register", registerUser);

//Auth || POST
router.get("/currentUser/:id", currentUser);

//Apply Doctor || POST
router.post("/apply-doctor", applyDoctor);

//GET ALL DOC
router.get("/getAllDoctors", getAllDocotrs);

//BOOK APPOINTMENT
router.post("/book-appointment", bookeAppointmnet);

//Appointments List
router.get("/user-appointments", userAppointments);

//Appointments List
router.get("/nurse-appointments", nurseAppointments);

//Check Availability
router.get("/checkAvailability", bookingAvailability);

//Medication Download
router.get("/medicationDownload", downloadMedication);

//Cancel Appointment
router.delete("/appointment/:id", cancelAppointment);

//assign doctor
router.post("/assign-doctor", assigndoctor);

//assign doctor
router.post("/reschedule", reschedule);

//payment
router.post('/payment',paymentController)

//todays appointments
router.get('/todaysappointments',getTodaysAppointments)

//payment
router.post('/updateComments',updateAppointmentComments)


module.exports = router;