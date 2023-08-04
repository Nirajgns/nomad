const router = require("express").Router();

const {
  addContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
} = require("../controllers/contactUsController");
const requireAuth = require("../middlewares/requireAuth");

//create contact us
router.post("/", addContactUs);

//get all contact us
router.get("/", requireAuth, getAllContactUs);

//get contact us by id
router.get("/:id", requireAuth, getContactUsById);

//update contact us
router.put("/:id", requireAuth, updateContactUs);

//delete contact us
router.delete("/:id", requireAuth, deleteContactUs);

module.exports = router;
