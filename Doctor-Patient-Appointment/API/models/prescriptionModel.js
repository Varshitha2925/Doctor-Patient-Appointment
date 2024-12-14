const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema(
  {
    prescription_id: {
      type: String,
    },
    appointmentid:{
      type:String
    },
    medication: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

const precriptionModel = mongoose.model("Prescription", prescriptionSchema);
module.exports = precriptionModel;
