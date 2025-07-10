const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  updateArchive,
  getTrashedNotes,
  permanentDeleteNote,
  emptyTrash,
} = require("../controllers/noteController");

const { validateNote } = require("../middlewares/validateNote");

router.post("/", validateNote, createNote); // Validate before creating
router.put("/:id", validateNote, updateNote); // Validate before updating
router.get("/", getNotes);
router.get("/:id", getNote);
router.delete("/:id", deleteNote);
router.patch("/:id/archive", updateArchive); // Toggle archive
router.get("/trash", getTrashedNotes); // View trashed notes
router.delete("/:id/permanent", permanentDeleteNote); // Permanent delete note
router.delete('/trash/empty', emptyTrash);


module.exports = router;
