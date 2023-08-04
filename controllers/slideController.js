const Slide = require("../models/Slide");
const asyncWrapper = require("../utils/asyncWrapper");
const { cloudinary } = require("../utils/cloudinary");

const addSlide = asyncWrapper(async (req, res) => {
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
  const slide = new Slide({
    imageUri: img,
  });
  await slide.save();
  res.status(200).json(slide);
});

const getAllSlide = asyncWrapper(async (req, res) => {
  const slides = await Slide.find();
  res.status(200).json(slides);
});

const getSlideById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const slide = await Slide.findById(id);
  res.status(200).json(slide);
});

const updateSlide = asyncWrapper(async (req, res) => {
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
  const slide = await Slide.findByIdAndUpdate(
    id,
    { imageUri: img },
    { new: true }
  );
  res.status(200).json(slide);
});

const deleteSlide = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  //   delete image from cloudinary
  //   const image = await Slide.findById(id);
  //   if (!image) {
  //     return res.status(404).json({ message: "Slide not found" });
  //   }

  //   const publicId = image.match(/\/([^/]+)\.[^.]+$/)[1]; // Extract the public ID from the Cloudinary URL.
  //   const result = await cloudinary.uploader.destroy(publicId, {
  //     invalidate: true,
  //   });

  //   console.log(
  //     result,
  //     `Image ${publicId} has been successfully deleted from Cloudinary.`
  //   );

  const deletedSlide = await Slide.findByIdAndDelete(id);
  res.status(200).json({
    deleteSlide: deletedSlide,
    message: "Slide deleted successfully",
  });
});

module.exports = {
  addSlide,
  getAllSlide,
  getSlideById,
  updateSlide,
  deleteSlide,
};
