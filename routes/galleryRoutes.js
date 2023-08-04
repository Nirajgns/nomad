const router = require("express").Router();
const {
  addGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");
const requireAuth = require("../middlewares/requireAuth");

//add images

router.put("/:id", requireAuth, updateGallery);
router.get("/:id", getGalleryById);

router.post("/", requireAuth, addGallery);
router.get("/", getAllGallery);
router.delete("/:id", requireAuth, deleteGallery);

module.exports = router;
