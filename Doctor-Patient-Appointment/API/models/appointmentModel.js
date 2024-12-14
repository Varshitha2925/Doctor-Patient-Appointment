const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointmentTime: {
      type: Array,
    },
    appointmentId: {
      type: String,
    },
    userId: {
      type: String,
      
    },
    doctorId: {
      type: String,
      
    },
    doctorInfo: {
      type: String,
      
    },
    userInfo: {
      type: String,
      
    },
    date: {
      type: String,
      
    },
    status: {
      type: String,
      default: "pending",
    },
    timeline: {
      type: String,
      default: "Up-Comming",
    },
    time: {
      type: Array,
      
    },
    medication: {
      type: Array,
    },
    comments: {
      type: Array,
    },
    insurance: {
      type: Boolean,
    },
    timeSlot:{
      type: String,
    },
    brief: {
      type: String
    },
    paid: {
      type: String
    }
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;
