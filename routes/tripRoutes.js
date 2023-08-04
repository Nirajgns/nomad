const express = require("express");
const {
  addTrip,
  updateTrip,
  getAllTrips,
  getTripById,
  deleteTrip,
} = require("../controllers/tripController");
const requireAuth = require("../middlewares/requireAuth");
const { search } = require("../controllers/searchController");

const router = express.Router();

router.post("/", addTrip);
router.put("/:id", requireAuth, updateTrip);
router.get("/", getAllTrips);
// //for search trip
// router.get("/", search);
router.get("/:id", getTripById);
router.delete("/:id", requireAuth, deleteTrip);

module.exports = router;
