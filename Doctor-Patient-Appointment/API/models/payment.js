const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId
  },
  cardNumber: {
    type: String,
  },
  expiryDate: {
    type: String,
  },
  cvv: {
    type: String,
  },
  name: {
    type: String,

  },
  amount: {
    type: Number,

  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
