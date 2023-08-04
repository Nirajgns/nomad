const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const continentSchema = new Schema({
  name: { type: String, required: true },
  region: { type: String },
  description: { type: String },
  image: [{ type: String }],
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip", default: [] }],
});

module.exports = mongoose.model("Continent", continentSchema);
