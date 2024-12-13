const doctorModel = require("../models/doctorModel");
const User = require("../models/userModel");
const appointmentModel = require("../models/appointmentModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "Users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while fetching users",
      error,
    });
  }
};

//
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    console.log(req.body);
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    console.log(doctor);
    // const user = await userModel.findOne({ _id: doctor.userId });
    // user.isDoctor = status === "approved" ? true : false;
    // await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const {id} = req.params
    const deletedEvent = await doctorModel.findOneAndDelete({ _id:id });
    res.status(200).json({ message: 'Doctor deleted successfully',
      data: deletedEvent
     });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  deleteDoctor
};
