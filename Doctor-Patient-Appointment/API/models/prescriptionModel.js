const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema(
  {
    prescription_id: {
      type: String,
    },
    doctor_id: {
      type: String,
    },
    patient_id: {
      type: String,
    },
    medicines: {
        type: String,
    },
    instructions: {
        type: String,
    },
    issue_date: {
        type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const precriptionModel = mongoose.model("Prescription", prescriptionSchema);
module.exports = precriptionModel;
