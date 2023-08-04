const mongoose = require("mongoose");
const questionsSchema = new mongoose.Schema({
  qtitle: {
    type: String,
    required: [false, "Please enter the title "],
  },
  qdescription: {
    type: String,
    required: [false, "Please enter the description"],
  },
  qimages: {
    type: [String],
    required: [false, "Please enter image"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Question", questionsSchema);