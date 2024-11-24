const mongoose = require("mongoose");

const timeSlots = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    time: {
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

const timeSlotModel = mongoose.model("timeSlots", timeSlots);
module.exports = timeSlotModel;