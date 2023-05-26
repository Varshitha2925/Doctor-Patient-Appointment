const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  deleteOldAppointments,
} = require("../controllers/adminController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", validateToken, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", validateToken, getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  validateToken,
  changeAccountStatusController
);

module.exports = router;
