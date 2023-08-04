const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  country: { type: String, required: true },

  howDidYouFindUs: { type: String },
  tripDate: { type: Date },
});

module.exports = mongoose.model("ContactUs", contactSchema);
