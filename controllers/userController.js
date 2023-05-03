const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

//@desc Register a User
//@routw POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  // Since we cannot store raw password we need to encrypt and decrypt the password
  // Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User Created ${user}`);
  res.json({
    success: true,
    message: "User Created",
    data: user,
  });
});

//@desc Login User
//@routw POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  //   res.json({ message: "Login user" });
});

//@desc Current User Info
//@route POST /api/users/currentUser
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// Apply DOctor CTRL
const applyDoctor = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctotr",
    });
  }
};

//GET ALL DOC
const getAllDocotrs = async (req, res) => {
  console.log("req.query", req.query);
  try {
    specialization = req.query.specialization.split(",");
    experience = req.query.experience;
    sort = req.query.sort;
    if (sort == "asc") {
      sort = 1;
    } else {
      sort = -1;
    }
    const doctors = await doctorModel
      .find({})
      // .where.or([
      //   { specialization: [...specialization] },
      //   { experience: experience },
      // ])
      // .sort({ feesPerCunsaltation: sort });
      .where("specialization")
      .in([...specialization])
      .where("experience")
      .in(experience)
      .sort({ feesPerCunsaltation: sort });
    res.status(200).send({
      success: true,
      message: "Doctors Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Doctor",
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmnet = async (req, res) => {
  try {
    const newAppointment = new appointmentModel(req.body);
    newAppointment.appointmentId = newAppointment._id;
    let date = newAppointment.date.split("/");
    date = `${date[2]}-${date[1]}-${date[0]}`;
    let startTime = `${date}T${newAppointment.time[0]}Z`;
    let endTime = `${date}T${newAppointment.time[1]}Z`;
    console.log(startTime, endTime);
    newAppointment.appointmentTime[0] = moment(
      startTime,
      "YYYY-MM-DDTHH:mm:ss.ssss"
    ).toISOString();
    newAppointment.appointmentTime[1] = moment(
      endTime,
      "YYYY-MM-DDTHH:mm:ss.ssss"
    ).toISOString();
    console.log("new Appoint", newAppointment.appointmentTime);
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date: req.body.date,
      time: {
        $gte: req.body.time[0],
        $lte: req.body.time[1],
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
      console.log("Appointment not available");
    }

    await newAppointment.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
      data: newAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailability = async (req, res) => {
  try {
    // const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

//user appointments
const userAppointments = async (req, res) => {
  try {
    let array = [];
    const appointments = await appointmentModel.find({});
    appointments.forEach(async (record) => {
      let date = new Date(record.appointmentTime[0]);
      console.log(String(date.getMonth()));
      if (
        String(date.getMonth() + 1) == req.query.month &&
        req.query.month != "undefined"
      ) {
        array.push(record);
      } else {
        array = appointments;
      }
      console.log(record.date);
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: array,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  applyDoctor,
  getAllDocotrs,
  bookeAppointmnet,
  userAppointments,
  bookingAvailability,
};
