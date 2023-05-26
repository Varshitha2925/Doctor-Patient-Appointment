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
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    timeline: {
      type: String,
      required: true,
      default: "Up-Comming",
    },
    time: {
      type: Array,
      required: true,
    },
    medication: {
      type: Array,
    },
    comments: {
      type: Array,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;
