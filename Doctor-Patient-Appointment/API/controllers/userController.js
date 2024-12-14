const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const logger = require("../controllers/logger");
const prescriptionModel = require("../models/prescriptionModel");
// const insuranceModel = require("../models/insuranceModel")
const paymentModel = require("../models/payment")
// const sendEmail = require("./nodeMail");

const nodemailer = require("nodemailer");
const payment = require("../models/payment")

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
  const { username, email, password, city, state, zipcode, insuarance} = req.body;
  // console.log("REQ BODY" , req.body)
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
    city,
    state,
    zipcode,
    insuarance
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


const loginUser = async (req, res) => {
  
  const { email, password } = req.body;
  console.log("Login creds", email)
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
    res.status(200).json({"data":user});
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  }

//@desc Current User Info
//@route POST /api/users/currentUser
//@access private

const currentUser = asyncHandler(async (req, res) => {
  try{
  const user = await User.findById(req.params.id);
  console.log("USERS", user)

  res.status(200).json({"data":user});
  } catch(err) {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

// Apply DOctor CTRL
const applyDoctor = async (req, res) => {
  try {
    // console.log("BODY" , req.body.password)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log("Hashed Password", hashedPassword);
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    newDoctor.password = hashedPassword;
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
  // console.log("req.query", req.query);
  try {
    
    const doctors = await doctorModel
      .find({})
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

//Book Appointment
const bookeAppointmnet = async (req, res) => {
  try{
    console.log("APPOINTMENT",req.body)
  const newAppointment = new appointmentModel(req.body);
  newAppointment.appointmentId = newAppointment._id;
  // newAppointment.doctorId = '';
  const timeSlot = req.body.timeSlot
  const [date, timeRange] = timeSlot.split(" ")
  newAppointment.date = date
  newAppointment.time = timeRange
  newAppointment.doctorId = req.body.did
  const user = await User.findById(req.body.userId);
  console.log("USER", user)
  newAppointment.userInfo = user.username

  await newAppointment.save();
  res.status(200).send({
  success: true,
  message: "Appointment Book succesfully",
  data: newAppointment,
  });}
  catch{
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });

  }
}




//BOOK APPOINTMENT
// const bookeAppointmnet = async (req, res) => {
//   try {
//     const newAppointment = new appointmentModel(req.body);
//     const newPrescription = new prescriptionModel();
//     newPrescription.appointmentId = newAppointment._id;
//     newPrescription.doctorId = req.body.doctorId;
//     newPrescription.userId = req.body.userId;
//     newAppointment.appointmentId = newAppointment._id;

//     let date = newAppointment.date.split("/");
//     date = `${date[2]}-${date[1]}-${date[0]}`;
//     let startTime = `${date}T${newAppointment.time[0]}Z`;
//     let endTime = `${date}T${newAppointment.time[1]}Z`;
//     console.log(startTime, endTime);
//     newAppointment.appointmentTime[0] = moment(
//       startTime,
//       "YYYY-MM-DDTHH:mm:ss.ssss"
//     ).toISOString();
//     newAppointment.appointmentTime[1] = moment(
//       endTime,
//       "YYYY-MM-DDTHH:mm:ss.ssss"
//     ).toISOString();
//     console.log("new Appoint", newAppointment.appointmentTime);
//     const doctorId = req.body.doctorId;
//     const appointments = await appointmentModel.find({
//       doctorId,
//       date: req.body.date,
//       time: {
//         $gte: req.body.time[0],
//         $lte: req.body.time[1],
//       },
//     });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Appointments not Availibale at this time",
//         success: true,
//       });
//     }

//     await newAppointment.save();
//     await newPrescription.save();
//     const toEmail = "varshitha.2925@gmail.com";
//     const subject = "Apoointment Confirmation";
//     const content = `Hi ${newAppointment.userInfo}\nYour appointment has been successfully booked at ${newAppointment.date} with ${newAppointment.doctorInfo}`;
//     await sendEmail(toEmail, subject, content);

//     res.status(200).send({
//       success: true,
//       message: "Appointment Book succesfully",
//       data: newAppointment,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error While Booking Appointment",
//     });
//   }
// };


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
    
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
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


//Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const {id} = req.params;
    const appointments = await appointmentModel.findByIdAndDelete(id);
    
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
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

//Assign Appointment
const assigndoctor = async (req, res) => {
  try {
    // const {id , doctorName} = req.body
    console.log("req.body",req.body)
    const id = req.body.appointmentId
    const doctorId = req.body.doctorId
    const date = req.body.date
    const time = req.body.starttime
    
    console.log(id)
    const appointments = await appointmentModel.findById(id);
    appointments.doctorId = doctorId
    appointments.date = date
    appointments.time = time
    await appointments.save()
    
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
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

//Reschedule Appointment
const reschedule = async (req, res) => {
  try {
    // const {id , doctorName} = req.body
    const id = req.body.appointmentId
    const time = req.body.time
    console.log(id)
    const appointments = await appointmentModel.findById(id);
    appointments.time = time
    await appointments.save()
    
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
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

const nurseAppointments = async (req, res) => {
  try {
    let array = [];
    const appointments = await appointmentModel.find()
    
      
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    
  }
};

const paymentController = async (req, res) => {
  try {
    const { appointmentId, cardNumber, expiryDate, cvv, amount } = req.body;
    // const booking = await Booking.findByIdAndUpdate(bookingId, {
    //   booking_status:"confirmed"
    // });
    // const event = await Event.findOne({id:booking.eventId})
    // event.ticketSold = event.ticketSold + booking.no_of_tickets
    // await event.save()
    // const paymentStatus = 'success'; 
    const payment = new paymentModel({
      appointmentId,
      cardNumber: cardNumber.slice(-4), 
      expiryDate,
      amount,
      // status: paymentStatus,
    });
    await payment.save();

    const appointment = await appointmentModel.findOne({"appointmentId":appointmentId})
    appointment.paid = "paid";
    await appointment.save()

    res.status(200).json({ message: 'Payment successful', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};
const getpayment = async(req, res) => {
  try{
    const payment = await paymentModel.findOne({
      appointmentId
    });
    res.status(200).json({ message: 'Payment successful', payment });



  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
}

//get todays appointments

const getTodaysAppointments = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // e.g., "2024-12-13"
    console.log("TODAY DATE",today)
    const appointments = await appointmentModel.find({
      date: today,
    }).sort({ time: 1 });
    console.log("TODAY APPOINTMENTS", appointments)

    res.status(200).json({ data: appointments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

const updateAppointmentComments = async (req, res) => {
  try {
    const { appointmentId, comments } = req.body;
    console.log("APPOINTMENT ID:",appointmentId)
    console.log("COMMENTS", comments)
    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { comments },
      { new: true }
    );


    res.status(200).json({ message: "Comments updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update comments" });
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
 
  cancelAppointment,
  assigndoctor,
  reschedule,
  nurseAppointments,
  paymentController,
  getpayment,
  getTodaysAppointments,updateAppointmentComments
};
