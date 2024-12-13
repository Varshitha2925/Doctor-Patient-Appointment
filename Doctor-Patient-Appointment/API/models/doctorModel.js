const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      // required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      // required: [true, "last name is required"],
    },
    phone: {
      type: String,
      // required: [true, "phone no is required"],
    },
    email: {
      type: String,
      // required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      // required: [true, "address is required"],
    },
    specialization: {
      type: Array,
      // required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      // required: [true, "experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      // required: [true, "fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Array,
      // required: [true, "work timing is required"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },

  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
