const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quickEnquirySchema = new Schema({
  tripName: { type: String },

  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("QuickEnquiry", quickEnquirySchema);
