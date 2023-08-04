const Continent = require("../models/Continent");
const asyncWrapper = require("../utils/asyncWrapper");
const { cloudinary } = require("../utils/cloudinary");

//add continent
const addContinent = asyncWrapper(async (req, res) => {
  const { name, region, description } = req.body;

  let img = [];
  {
    let result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        upload_preset: "nomad",
        public_id: `${Date.now()}`,
        resource_type: "auto",
      }
    );
    img.push(result.secure_url);
  }

  if (!name) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields" });
  }
  try {
    const continent = await Continent.create({
      name,
      region,
      description,
      image: img,
    });
    res.status(200).json({ continent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all continents
const getAllContinents = asyncWrapper(async (req, res) => {
  try {
    const continent = await Continent.find().populate("trips");
    res.status(200).json({ continent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get continent by id
const getContinent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  try {
    const continent = await Continent.findById(id).populate("trips");
    res.status(200).json({ continent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update continent
const updateContinent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, region, description } = req.body;

  let img = [];
  let result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    upload_preset: "nomad",
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  img.push(result.secure_url);

  try {
    const continent = await Continent.findByIdAndUpdate(id, {
      name,
      region,
      description,
      image: img,
    });
    res.status(200).json({ continent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete continent
const deleteContinent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  try {
    const continent = await Continent.findByIdAndDelete(id);
    res.status(200).json({ continent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = {
  getContinent,
  addContinent,
  updateContinent,
  deleteContinent,
  getAllContinents,
};
