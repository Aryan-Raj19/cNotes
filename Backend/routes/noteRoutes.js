const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  updateArchive,
} = require("../controllers/noteController");

const { validateNote } = require("../middlewares/validateNote");

router.post("/", validateNote, createNote); // Validate before creating
router.put("/:id", validateNote, updateNote); // Validate before updating
router.get("/", getNotes);
router.get("/:id", getNote);
router.delete("/:id", deleteNote);
router.patch("/:id/archive", updateArchive);

module.exports = router;
