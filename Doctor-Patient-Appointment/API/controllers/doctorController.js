const { hash } = require("bcrypt");
const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const feedbackModel = require("../models/feedbackModel");
const userModel = require("../models/userModel");
const moment = require("moment");
const prescriptionModel = require("../models/prescriptionModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.user.id });
    const cutoffTime = moment().subtract(3, "days").toDate();
    console.log("today Date", moment().toDate());
    const recordsToDelete = await appointmentModel.find({
      doctorId: doctor._id,
      status: "pending",
      createdAt: { $lt: cutoffTime },
    });

    recordsToDelete.forEach(async (record) => {
      await appointmentModel.findByIdAndDelete(record._id);
      console.log(`Record ${record._id} deleted!`);
    });

    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    const currentDate = new Date();
    appointments.forEach(async (record) => {
      if (record.time[0] <= currentDate) {
        record.timeline = "In Progress";
      } else {
        record.timeline = "Up Comming";
      }
    });

    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status, timeline } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status, timeline }
    );
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

const multipleCommentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.findById(appointmentsId);
    appointments.comments.push(comment);
    await appointments.save();
    const user = await userModel.findOne({ _id: appointments.userId });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Comment Updated Successfully",
      data: appointments.comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Updating Comments",
    });
  }
};

const totalFeeCalculator = async (req, res) => {
  let totalFeeCollected = 0;
  try {
    const doctor = await doctorModel.findOne({ userId: req.user.id });
    const today = `${moment().toDate().getDate()}/${
      moment().toDate().getMonth() + 1
    }/${moment().toDate().getFullYear()}`;
    console.log(today);
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
      timeline: "closed",
      date: today,
    });

    appointments.forEach(async (record) => {
      totalFeeCollected += doctor.feesPerCunsaltation;
      console.log(record.date);
    });
    res.status(200).send({
      success: true,
      message: "Total Fees Calculated Sucessfully",
      data: totalFeeCollected,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In getting Total Fee",
    });
  }
};

const postMedication = async (req, res) => {
  try {
    const { appointmentId, medication } = req.body;
    const prescription = await prescriptionModel.findByIdAndUpdate(
      appointmentId,
      { medication }
    );
    console.log(prescription);
    prescripton.medication.push(medication);

    await appointments.save();

    res.status(200).send({
      success: true,
      message: "Medication Posted Sucessfully",
      data: appointments.medication,
    });
    
    // 644a376f95429b7b4b4348e5
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in posting medication",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  doctorAppointmentsController,
  updateStatusController,
  multipleCommentsController,
  totalFeeCalculator,
  postMedication,
};
