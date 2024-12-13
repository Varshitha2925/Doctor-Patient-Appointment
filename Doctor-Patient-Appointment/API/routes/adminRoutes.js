const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  deleteDoctor
} = require("../controllers/adminController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  
  changeAccountStatusController
);
//DELETE
router.delete("/deleteDoctor/:id",deleteDoctor)

module.exports = router;
