const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  position: {
    type: String,
  },
  description: {
    type: String,
  },
  image: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
