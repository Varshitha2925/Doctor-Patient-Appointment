const mongoose = require("mongoose");

const insuranceSchema = mongoose.Schema(
  {
    insurance_id: {
        type: String,
    },
    patient_id: {
        type: String,
    },
    insuarance_company: {
        type: String,
      },
    valid_till: {
        type: Date,
    }
  }
);

const insuranceModel = mongoose.model("Insurance", insuranceSchema);
module.exports = insuranceModel;
