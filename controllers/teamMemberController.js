const TeamMember = require("../models/TeamMember");
const asyncWrapper = require("../utils/asyncWrapper");
const { cloudinary } = require("../utils/cloudinary");

// Add a new team member
const addTeamMember = asyncWrapper(async (req, res) => {
  const { name, email, position, description } = req.body;
  try {
    let result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        upload_preset: "nomad",
        public_id: `${Date.now()}`,
        resource_type: "auto",
      }
    );

    const teamMember = await TeamMember.create({
      name,
      email,
      position,
      description,
      image: [result.secure_url],
    });
    res.status(200).json({ teamMember });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//get all team members
const getAllTeamMembers = asyncWrapper(async (req, res) => {
  console.log(req);
  try {
    const teamMembers = await TeamMember.find();
    res.status(200).json({ teamMembers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//get team member by id
const getTeamMemberById = asyncWrapper(async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    res.status(200).json({ teamMember });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//update team member
const updateTeamMember = asyncWrapper(async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    const publicId = member.image[0].match(/\/([^/]+)\.[^.]+$/)[1]; // Extract the public ID from the Cloudinary URL.
    const deletedImage = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    }); // Delete
    console.log(deletedImage);

    const { name, email, position, description } = req.body;

    // if (typeof req.files.image == "null") {
    //   const teamMember = await TeamMember.findByIdAndUpdate(
    //     req.params.id,
    //     {
    //       name,
    //       email,
    //       position,
    //       description,
    //     },
    //     {
    //       new: true,
    //     }
    //   );
    //   res.status(200).json({ teamMember });
    //   return;
    // }
    let result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        upload_preset: "nomad",
        public_id: `${Date.now()}`,
        resource_type: "auto",
      }
    );
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        position,
        description,
        image: [result.secure_url],
      },
      {
        new: true,
      }
    );
    res.status(200).json({ teamMember });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

const deleteTeamMember = asyncWrapper(async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ teamMember });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};
