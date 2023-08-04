const mongoose = require("mongoose");
const ContactUs = require("../models/ContactUs");
const transporter = require("../utils/nodeMailer");
const asyncWrapper = require("../utils/asyncWrapper");

//add a contact us
const addContactUs = asyncWrapper(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    message,
    country,
    howDidYouFindUs,
    tripDate,
  } = req.body;

  //validation
  if (!fullName || !email || !phone || !message || !country) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields" });
  }

  //send mail to nomad
  const mailOptions = {
    from: "dipubhandari88@gmail.com", //sender's mail address
    to: "thenomad.data@gmail.com", //organizatoins mial
    subject: "New Contact Us form info",
    text: `following are the information on the new contact us form :
    Full Name: ${fullName} \n 
    Email: ${email} \n
    Phone: ${phone} \n
    Message: ${message} \n 
    Country: ${country} \n 
    How Did You Find Us: ${howDidYouFindUs} \n 
    Trip Date: ${tripDate}.
    
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
    const newContactUs = new ContactUs({
      fullName,
      email,
      phone,
      message,
      country,
      howDidYouFindUs,
      tripDate,
    });

    const savedContactUs = await newContactUs.save();
    res.status(200).json({ savedContactUs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all contact us
const getAllContactUs = asyncWrapper(async (req, res) => {
  try {
    const contactUs = await ContactUs.find();
    res.status(200).json({ contactUs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get contact us by id
const getContactUsById = asyncWrapper(async (req, res) => {
  const contactUs = await ContactUs.findById(req.params.id);
  try {
    res.status(200).json({ contactUs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update contact us
const updateContactUs = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const {
    fullName,
    email,
    phone,
    message,
    country,
    howDidYouFindUs,
    tripDate,
  } = req.body;

  try {
    const updatedContactUs = await ContactUs.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        phone,
        message,
        country,
        howDidYouFindUs,
        tripDate,
      },
      { new: true }
    );
    res.status(200).json({ updatedContactUs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete contact us
const deleteContactUs = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  try {
    const deletedContactUs = await ContactUs.findByIdAndDelete(id);
    res.status(200).json({ deletedContactUs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
};
