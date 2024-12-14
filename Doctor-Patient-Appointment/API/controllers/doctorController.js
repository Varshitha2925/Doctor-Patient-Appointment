const { hash } = require("bcrypt");
const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
       
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const moment = require("moment");
const prescriptionModel = require("../models/prescriptionModel");
const timeSlotModel = require("../models/timeSlot");


const login = async (req, res) => {
  
  const { email, password } = req.body;
  console.log("Login creds", {email,password})
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await doctorModel.findOne({ email });
  user.userId = user._id
  console.log("USER" , user)

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
    res.status(200).json({user});
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  }

const getDoctorInfoController = async (req, res) => {
  try {
    const userId = req.body.id
    console.log("USERID" , userId)
    // const doctor = await doctorModel.findOne({ userId: userId});
    const doctor = await doctorModel.findOne(
      { userId: userId },
      
    );
    console.log("DOCTOR",doctor)
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
    // let array = [];
    const appointments = await appointmentModel.find({});
    // appointments.forEach(async (record) => {
    //   let date = new Date(record.appointmentTime[0]);
    //   // console.log(String(date.getMonth()));
    //   if (
    //     String(date.getMonth() + 1) == req.query.month &&
    //     req.query.month != "undefined"
    //   ) {
    //     array.push(record);
    //   } else {
    //     array = appointments;
    //   }
      // console.log(record.date);
    // });
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

// const doctorAppointmentsController = async (req, res) => {
//   try {
//     const doctor = await doctorModel.findOne({ userId: req.user.id });
//     const cutoffTime = moment().subtract(3, "days").toDate();
//     console.log("today Date", moment().toDate());
//     const recordsToDelete = await appointmentModel.find({
//       doctorId: doctor._id,
//       status: "pending",
//       createdAt: { $lt: cutoffTime },
//     });

//     recordsToDelete.forEach(async (record) => {
//       await appointmentModel.findByIdAndDelete(record._id);
//       console.log(`Record ${record._id} deleted!`);
//     });

//     const appointments = await appointmentModel.find({
//       doctorId: doctor._id,
//     });
//     const currentDate = new Date();
//     appointments.forEach(async (record) => {
//       if (record.time[0] <= currentDate) {
//         record.timeline = "In Progress";
//       } else {
//         record.timeline = "Up Comming";
//       }
//     });

//     res.status(200).send({
//       success: true,
//       message: "Doctor Appointments fetch Successfully",
//       data: appointments,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Doc Appointments",
//     });
//   }
// };

const medication = async (req,res) => {
  try {
    const medication = await prescriptionModel.create(
      req.body
    );
    const appointment = await appointmentModel.findOne({
      appointmentId: req.body.appointmentid,
      
    })
    appointment.medication = req.body.medication
    await appointment.save()
    await medication.save()

    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      data: medication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
}
const getmedication = async (req,res) => {
  try {
    const medication = await prescriptionModel.findOne(
      req.body
    );

    
    // await medication.save()

    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      data: medication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
}

const updateStatusController = async (req, res) => {
  try {

    // const { appointmentsid, status} = req.body;
    console.log("STATUS", req.body)
    const appointmentsid = req.body.appointmentid
    const status = req.body.status
    console.log("GETTT", {appointmentsid, status})
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsid,
      {status:status}
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
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in posting medication",
    });
  }
};

const timeSlotController = async (req, res) => {
  try {
    // const userId = req.body.userId
    // const time = req.body.time
    console.log("req.body", req.body)
    const { userId, time } = req.body;
    const timeSlot = await timeSlotModel.findOneAndUpdate(
      { userId: userId },
      { $push: { time: time } },
    );
    if(timeSlot){
      timeSlot.time = [...new Set(timeSlot.time)];
      
      await timeSlot.save();
    }
    else{
      const newSlot = new timeSlotModel({ userId, time});
      await newSlot.save();
    }
    console.log("timeSlot", timeSlot)
    res.status(200).send({
      success: true,
      message: "Comment Updated Successfully",
      data: timeSlot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Updating Comments",
    });
  }
}
const gettimeSlotController = async (req, res) => {
    try {
      // const userId = req.body.userId
      // const time = req.body.time
    
      // const userId = req.params.id;

      // console.log("USERID" , userId)
      const timeSlot = await timeSlotModel.find();
      
      console.log("timeSlot", timeSlot)
      res.status(200).send({
        success: true,
        message: "Comment Updated Successfully",
        data: timeSlot,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Updating Comments",
      });
    }
}

const gettimeSlotControllerID = async (req, res) => {
  try {
    // const userId = req.body.userId
    // const time = req.body.time
  
    const userId = req.params.id;

    console.log("USERID" , userId)
    const timeSlot = await timeSlotModel.findOne({"userId":userId});
    
    console.log("timeSlot", timeSlot)
    res.status(200).send({
      success: true,
      message: "Comment Updated Successfully",
      data: timeSlot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Updating Comments",
    });
  }
}

const removetimeSlotController = async (req, res) => {
  try {
    // const userId = req.body.userId
    // const time = req.body.time
  
    const userId= req.params.id;

    console.log("USERID" , userId)
    const timeSlot = await timeSlotModel.findOneAndDelete({
      userId : userId,
    });
    
    console.log("timeSlot", timeSlot)
    res.status(200).send({
      success: true,
      message: "Comment Updated Successfully",
      data: timeSlot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Updating Comments",
    });
  }
}






module.exports = {
  getDoctorInfoController,
  updateProfileController,
  doctorAppointmentsController,
  updateStatusController,
  multipleCommentsController,
  totalFeeCalculator,
  postMedication,
  timeSlotController,
  login,
  gettimeSlotController,
  removetimeSlotController,
  medication,
  getmedication,
  gettimeSlotControllerID
};
