// models/Trip.js
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true }, // trip name or user name
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    guests: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
      infants: { type: Number, default: 0 },
    },
    travelAssistanceNeeded: { type: Boolean, default: false },
    travelAssistanceType: { type: String, default: "" },
    status: { type: String, default: "CONFIRMED" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
