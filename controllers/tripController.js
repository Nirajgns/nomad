const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const { cloudinary } = require("../utils/cloudinary");
const asyncWrapper = require("../utils/asyncWrapper");
const Continent = require("../models/Continent");

//route to add trip
const addTrip = asyncWrapper(async (req, res) => {
  const {
    title,
    country,
    price,
    duration,
    reviews,
    overview,
    highlights,
    itinerary,
    included,
    excluded,
    continentid,
  } = req?.body;

  // const foundContinent = await Continent.findById(continentid);
  // const index = foundContinent.trips.indexOf(continentid);
  // const removedContinent = foundContinent.trips.splice(index, 1);

  try {
    if (!title || !country || !price || !duration) {
      return res.status(404).json({ message: "Fill all the required fields" });
    }

    let img = [];
    for (let i = 0; i < req?.files?.image.length; i++) {
      let result = await cloudinary.uploader.upload(
        req.files.image[i].tempFilePath,
        {
          upload_preset: "nomad",
          public_id: `${Date.now()}`,
          resource_type: "auto",
        }
      );
      img.push(result.secure_url);
    }

    const trip = new Trip({
      title,
      country,
      price,
      duration,
      reviews,
      images: img,
      overview,
      highlights,
      itinerary,
      included,
      excluded,
      continent: continentid,
    });
    await trip.save();

    const continent = await Continent.findById(continentid);
    continent.trips.push(trip._id);
    await continent.save();
    console.log(continent.trips);

    // Add the images array to the trip model and save it
    // trip.images = images;
    // await trip.save();

    res.status(200).json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//route to get all trips
const getAllTrips = asyncWrapper(async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get trip by id
const getTripById = asyncWrapper(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  try {
    res.status(200).json({ trip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//route to update trip
const updateTrip = asyncWrapper(async (req, res) => {
  const tripid = req.params.id;
  const {
    title,
    country,
    price,
    duration,
    reviews,
    overview,
    highlights,
    itinerary,
    included,
    excluded,
    continentid,
  } = req.body;

  //working
  if (continentid) {
    const continent = await Continent.findById(continentid);

    const tripIndex = continent.trips.indexOf(tripid);
    const removedTrip = continent.trips.splice(tripIndex, 1);
    const newTripsArray = continent.trips.push(tripid);
    await continent.save();
    console.log(newTripsArray);
  }

  //to delete previous images
  try {
    const trip = await Trip.findOne({ _id: tripid });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    let imageidArray = [];

    for (const image of trip.images) {
      const publicId = image.match(/\/([^/]+)\.[^.]+$/)[1]; // Extract the public ID from the Cloudinary URL.
      const result = await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
      }); // Delete the image from Cloudinary.

      console.log(
        `Image ${publicId} has been successfully deleted from Cloudinary.`
      );
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  //to update images
  let img = [];
  for (let i = 0; i < req?.files?.image.length; i++) {
    let result = await cloudinary.uploader.upload(
      req.files.image[i].tempFilePath,
      {
        upload_preset: "nomad",
        public_id: `${Date.now()}`,
        resource_type: "auto",
      }
    );
    img.push(result.secure_url);
  }

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripid,
      {
        title,
        country,
        price,
        duration,
        reviews,
        images: img,
        overview,
        highlights,
        itinerary,
        included,
        excluded,
        continent: continentid,
      },
      { new: true }
    );
    res.status(200).json({ updatedTrip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//route to delete trip
const deleteTrip = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrip = await Trip.findByIdAndDelete(id);
    res.status(200).json({ deletedTrip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addTrip,
  updateTrip,
  getAllTrips,
  getTripById,
  deleteTrip,
};
