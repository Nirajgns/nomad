router = require("express").Router();

const {
  getAllBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const requireAuth = require("../middlewares/requireAuth");

//add new booking
router.post("/", addBooking);

//get all bookings
router.get("/", requireAuth, getAllBookings);

//get booking by id
router.get("/:id", requireAuth, getBookingById);

//update booking
router.put("/:id", requireAuth, updateBooking);

//delete booking
router.delete("/:id", requireAuth, deleteBooking);

module.exports = router;
