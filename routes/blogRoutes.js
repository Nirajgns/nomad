const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");

const {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const upload = require("../utils/multer");

// const fields = [  { name: "image", maxCount: 2 },];
// for (let i = 0; i < 10; i++) {
//   const qimageField = { name: `questions[${i}][qimage]`, maxCount: 10 };
//   fields.push(qimageField);
// }

router.post("/",  upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]),addBlog);

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.put("/:id",upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]), updateBlog);

router.delete("/:id", requireAuth, deleteBlog);

module.exports = router;
