const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const slideSchema = new Schema({
  imageUri: [String],
});

module.exports = mongoose.model("Slide", slideSchema);
