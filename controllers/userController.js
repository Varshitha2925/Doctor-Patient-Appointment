const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const logger = require("../controllers/logger");
// const sendEmail = require("./nodeMail");

const nodemailer = require("nodemailer");

// Function to send the email
const sendEmail = async (toEmail, subject, content) => {
  console.log(toEmail);
  try {
    // Create a transporter using your SMTP credentials
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "varshithareddy2925@gmail.com",
        pass: "culneskyawxixmuk",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "varshithareddy2925@gmail.com",
      to: toEmail,
      subject: subject,
      text: content,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const fs = require("fs");
const PDFDocument = require("pdfkit");

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
    logger.customerLogger.log("info", "Successfully logged in");
  } else {
    res.status(401);
    logger.customerLogger.log("error", "Error in logging user");
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
    let specialization = req.query.specialization.split(",");
    let experience = req.query.experience;
    let sort = req.query.sort;
    if (sort == "asc") {
      sort = 1;
    } else {
      sort = -1;
    }
    const doctors = await doctorModel
      .find({})
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
    }

    await newAppointment.save();
    const toEmail = "varshitha.2925@gmail.com";
    const subject = "Apoointment Confirmation";
    const content = `Hi ${newAppointment.userInfo}\nYour appointment has been successfully booked at ${newAppointment.date} with ${newAppointment.doctorInfo}`;
    await sendEmail(toEmail, subject, content);
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
//generating PDF for medication
const downloadMedication = async (req, res) => {
  try {
    const appointmentId = req.body.appointmentId;
    const appointments = await appointmentModel.find({ appointmentId });
    console.log(appointments);
    const medicationData = appointments[0].medication;
    console.log(medicationData);

    const doc = new PDFDocument();
    const doctorInfo = {
      name: appointments[0].doctorInfo,
      id: appointments[0].doctorId,
    };

    const patientInfo = {
      name: appointments[0].userInfo,
      id: appointments[0].userId,
    };
    // 644a376f95429b7b4b4348e5

    // Set positions for doctor and patient information
    const doctorX = 350;
    const doctorY = 50;
    const patientX = 50;
    const patientY = 50;

    // Write doctor information
    doc.text("Doctor Information:", doctorX, doctorY);
    doc.text(`Name: ${doctorInfo.name}`, doctorX, doctorY + 20);
    doc.text(`Id: ${doctorInfo.id}`, doctorX, doctorY + 40);

    // Write patient information
    doc.text("Patient Information:", patientX, patientY);
    doc.text(`Name: ${patientInfo.name}`, patientX, patientY + 20);
    doc.text(`Id: ${patientInfo.id}`, patientX, patientY + 40);

    doc.moveDown();

    medicationData.forEach((element) => {
      doc.text(`${element.medicineName} : ${element.Time}`, {
        align: "center",
      });
    });

    // Generate a unique filename
    const fileName = `output-${Date.now()}.pdf`;

    // Save the PDF to the file system
    const filePath = `./pdfs/${fileName}`;
    doc.pipe(fs.createWriteStream(filePath));
    doc.end();

    res.status(200).send({
      success: true,
      message: "PDF file has been generated and saved successfully",
      data: filePath,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Generating PDF",
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
  downloadMedication,
};
