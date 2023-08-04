const {
  getAllQuickEnquiries,
  getQuickEnquiryById,
  addQuickEnquiry,
  updateQuickEnquiry,
  deleteQuickEnquiry,
} = require("../controllers/quickEnquiryController");
const requireAuth = require("../middlewares/requireAuth");

const router = require("express").Router();

//add new quick enquiry
router.post("/", addQuickEnquiry);

//get all quick enquiries
router.get("/", requireAuth, getAllQuickEnquiries);

//get quick enquiry by id
router.get("/:id", requireAuth, getQuickEnquiryById);

//update quick enquiry
router.put("/:id", requireAuth, updateQuickEnquiry);

//delete quick enquiry
router.delete("/:id", requireAuth, deleteQuickEnquiry);

module.exports = router;
