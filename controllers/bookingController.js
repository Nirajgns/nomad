const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const transporter = require("../utils/nodeMailer");
const asyncWrapper = require("../utils/asyncWrapper");
const Trip = require("../models/Trip");

//add booking
const addBooking = asyncWrapper(async (req, res) => {
  const {
    fullName,
    email,
    alternateEmail,
    phone,
    country,
    address,
    trip,
    numberOfTravellers,
    tripDate,
    estimatedDays,
    message,
  } = req.body;

  // if (
  //   !fullName ||
  //   !email ||
  //   !phone ||
  //   !message ||
  //   !country ||
  //   !address ||
  //   !numberOfTravellers ||
  //   !tripDate ||
  //   !trip
  // ) {
  //   return res
  //     .status(400)
  //     .json({ message: "Please fill all the required fields" });
  // }

  //send mail to costumer for booking confirmation

  const bookedTrip = await Trip.findById(trip);

  try {
    const costumerMailOptions = {
      from: "dipubhandari88@gmail.com", //sender's mail address
      to: email, //costumers email address
      subject: "Booking Confirmation",
      text: `Dear ${fullName},
      
      We are delighted to confirm your booking with us at Nomad Experience.
      Your booking details are as follows:
      
      - Trip: ${bookedTrip.title}
      - Check-in date: ${tripDate}
      - Number of guests: ${numberOfTravellers}
      
      We would also like to take this opportunity to remind you of our cancellation policy. In case you need to make any changes to your booking,
      please do let us know at least 48 hours in advance of your check-in date to avoid any cancellation charges,
      and our team is here to assist you with any queries or recommendations you may need during your stay.
      If you have any questions or concerns, please feel free to get in touch with our customer service team at any time.
      We can't wait to host you and ensure that you have an unforgettable experience.
      We look forward to welcoming you soon!
      
      Best regards,
      The Nomad Experience Team`,
    };
    transporter.sendMail(costumerMailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }); //end of costumers mail for booking confirmation

    //send mail to nomad for booking confirmation
    const nomadMailOptions = {
      from: "dipubhandari88@gmail.com", //sender's mail address
      to: "thenomad.data@gmail.com", //organizatoins mial
      subject: "Booking Confirmation",
      text: `Booking info: ${JSON.stringify({
        fullName,
        email,
        alternateEmail,
        phone,
        country,
        address,
        trip: bookedTrip.title,
        numberOfTravellers,
        tripDate,
        estimatedDays,
        message,
      })}
      Please open the dashboard for more info.`,
    };

    transporter.sendMail(nomadMailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    //end of nomad mail
  } catch (error) {
    console.log(error, error.message);
  } //end of mail for booking confirmation

  try {
    const booking = new Booking({
      fullName,
      email,
      alternateEmail,
      phone,
      country,
      address,
      trip,
      numberOfTravellers,
      tripDate,
      estimatedDays,
      message,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all bookings
const getAllBookings = asyncWrapper(async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json(bookings);
});

//get booking by id
const getBookingById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);
  res.status(200).json(booking);
});

//update booking
const updateBooking = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    email,
    alternateEmail,
    phone,
    country,
    address,
    tripName,
    numberOfTravellers,
    tripDate,
    estimatedDays,
    message,
  } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    id,
    {
      fullName,
      email,
      alternateEmail,
      phone,
      country,
      address,
      tripName,
      numberOfTravellers,
      tripDate,
      estimatedDays,
      message,
    },
    { new: true }
  );
  res.status(200).json(booking);
});

//delete booking
const deleteBooking = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndDelete(id);
  res.status(200).json(booking);
});

module.exports = {
  addBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
