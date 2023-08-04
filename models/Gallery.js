const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  imageUri: [String],
});

module.exports = mongoose.model("Gallery", gallerySchema);
