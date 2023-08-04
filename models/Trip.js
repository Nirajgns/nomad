const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },

  reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
  sataus: { type: Boolean, default: true },
  // continent: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Continent",
  // },
  // continent: { type: String },
  images: [String],
  overview: { type: String, default: "" },
  highlights: [{ type: String }],
  itinerary: [{ type: String, default: [] }],
  included: [{ type: String, default: [] }],
  excluded: [{ type: String, default: [] }],
  slug: { type: String, unique: true },
});

tripSchema.pre("save", async function (next) {
  this.slug = slugify(this.title);
  next();
});

// function to slugify a name
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

module.exports = mongoose.model("Trip", tripSchema);
