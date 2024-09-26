const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    payment_id: {
        type: String,
    },
    appointment_id: {
        type: String, 
    },
    amount: {
        type: Number,
    },
    payment_method: {
        type: String,
    },
    payment_date: {
        type: Date,
    },
  },
);

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;
