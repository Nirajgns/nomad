const asyncWrapper = require("../utils/asyncWrapper");
const Trip = require("../models/Trip");

const search = asyncWrapper(async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Please enter a search parameter" });
  }
  // console.log(query);
  const regex = new RegExp(query, "i");
  foundTrips = await Trip.find({ continent: regex });
  res.status(200).json(foundTrips);
});

module.exports = {
  search,
};
