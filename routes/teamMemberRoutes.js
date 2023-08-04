const router = require("express").Router();
const {
  addTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamMemberController");
const requireAuth = require("../middlewares/requireAuth");

router.post("/", requireAuth, addTeamMember);
router.get("/", getAllTeamMembers);
router.get("/:id", getTeamMemberById);
router.put("/:id", requireAuth, updateTeamMember);
router.delete("/:id", requireAuth, deleteTeamMember);

module.exports = router;
