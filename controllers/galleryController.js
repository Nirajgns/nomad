const asyncWrapper = require("../utils/asyncWrapper");
const { cloudinary } = require("../utils/cloudinary");
const Gallery = require("../models/Gallery");

//add a gallery
const addGallery = asyncWrapper(async (req, res) => {
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
  const gallery = new Gallery({
    imageUri: img,
  });
  await gallery.save();
  res.status(200).json(gallery);
});

//get all gallery
const getAllGallery = asyncWrapper(async (req, res) => {
  const galleries = await Gallery.find();
  res.status(200).json(galleries);
});

//get gallery by id
const getGalleryById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const gallery = await Gallery.findById(id);
  res.status(200).json(gallery);
});

//update gallery
const updateGallery = asyncWrapper(async (req, res) => {
  const { id } = req.params;
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
  const gallery = await Gallery.findByIdAndUpdate(
    id,
    { imageUri: img },
    { new: true }
  );
  res.status(200).json(gallery);
});

//delete gallery
const deleteGallery = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const gallery = await Gallery.findByIdAndDelete(id);
  res.status(200).json(gallery);
});

module.exports = {
  addGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
};
