const mongoose = require("mongoose");
const QuickEnquiry = require("../models/QuickEnquiry");
const transporter = require("../utils/nodeMailer");
const asyncWrapper = require("../utils/asyncWrapper");

//add quick enquiry
const addQuickEnquiry = asyncWrapper(async (req, res) => {
  const { tripName, fullName, email, phone, message } = req.body;

  //validaion
  if (!tripName || !fullName || !email || !phone || !message) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields" });
  }

  const mailOptions = {
    from: "dipubhandari88@gmail.com", //sender's mail address
    to: "thenomad.data@gmail.com", //organizatoins mial
    subject: "New Quick Enquiry info",
    text: `following are the information on the new contact us form :
    Full Name: ${fullName} \n 
    Email: ${email} \n
    Phone: ${phone} \n
    Message: ${message} \n
    Trip Name:${tripName}.
    
    Please open the dashboard for more info.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  try {
    const quickEnquiry = new QuickEnquiry({
      tripName,
      fullName,
      email,
      phone,
      message,
    });
    await quickEnquiry.save();
    res.status(201).json(quickEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all quick enquiries
const getAllQuickEnquiries = asyncWrapper(async (req, res) => {
  try {
    const quickEnquiries = await QuickEnquiry.find();
    res.status(200).json(quickEnquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get quick enquiry by id
const getQuickEnquiryById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  try {
    const quickEnquiry = await QuickEnquiry.findById(id);
    res.status(200).json(quickEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update quick enquiry
const updateQuickEnquiry = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  try {
    const quickEnquiry = await QuickEnquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(quickEnquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete quick enquiry
const deleteQuickEnquiry = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  try {
    const quickEnquiry = await QuickEnquiry.findByIdAndDelete(id);
    res.status(200).json(quickEnquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = {
  addQuickEnquiry,
  getAllQuickEnquiries,
  getQuickEnquiryById,
  updateQuickEnquiry,
  deleteQuickEnquiry,
};
