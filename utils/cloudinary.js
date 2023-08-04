require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFile(file) {
  const result = await cloudinary.uploader.upload(file.path);
  return result.secure_url;
}

module.exports = { cloudinary, uploadFile };
