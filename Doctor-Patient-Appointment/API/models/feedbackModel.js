const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    feedback_id: {
        type: String,
    },
    appointment_id: {
        type: String, 
    },
    patient_id: {
        type: String,
    },
    doctor_id: {
        type: String,
    },
    rating: {
        type: Number,
    },
    comments: {
        type: String,
    },
  },
);

const feedbackModel = mongoose.model("Feedback", feedbackSchemaSchema);
module.exports = feedbackModel;
