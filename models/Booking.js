const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },

  country: { type: String, required: true },
  address: { type: String, required: true },

  numberOfTravellers: { type: Number, required: true },
  tripDate: { type: Date },

  estimatedDays: { type: Number },
  alternateEmail: { type: String },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
});

module.exports = mongoose.model("Booking", bookingSchema);
