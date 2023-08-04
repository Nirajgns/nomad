const mongoose = require("mongoose");
const questionsSchema = require("./QuestionsModel");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  images: [{ type: String, required:false }],
  description: {
    type: String,
  },
  questions: [],
});

module.exports = mongoose.model("Blog", blogSchema);

