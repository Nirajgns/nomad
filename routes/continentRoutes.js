const router = require("express").Router();
const {
  addContinent,
  getAllContinents,
  getContinent,
  updateContinent,
  deleteContinent,
} = require("../controllers/continentController");
const requireAuth = require("../middlewares/requireAuth");

//add continent
router.post("/", requireAuth, addContinent);

//get all continrnts
router.get("/", getAllContinents);

//get continent by id
router.get("/:id", getContinent);

//update continent
router.put("/:id", requireAuth, updateContinent);

//delete continent
router.delete("/:id", requireAuth, deleteContinent);

module.exports = router;
