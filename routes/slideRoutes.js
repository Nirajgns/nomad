const router = require("express").Router();
const {
  addSlide,
  getAllSlide,
  getSlideById,
  updateSlide,
  deleteSlide,
} = require("../controllers/slideController");
const requireAuth = require("../middlewares/requireAuth");

router.post("/", requireAuth, addSlide);
router.get("/", getAllSlide);
router.get("/:id", getSlideById);
router.put("/:id", requireAuth, updateSlide);
router.delete("/:id", requireAuth, deleteSlide);

module.exports = router;
