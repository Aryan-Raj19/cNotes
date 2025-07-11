const Note = require("../models/Note");

// Create Note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      userId: req.user._id, // Attach the user's ID to the note
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Notes for Authenticated User
// Get All Notes with Filters and Search
exports.getNotes = async (req, res) => {
  try {
    const { tag, archived, search } = req.query;

    // Base query: only notes belonging to the logged-in user
    const query = { userId: req.user._id, deleted: false }; // Exclude deleted notes

    // Filter by tag (if provided)
    if (tag) {
      query.tags = tag;
    }

    // Filter by archived status (if provided)
    if (archived === "true" || archived === "false") {
      query.archived = archived === "true";
    }

    // Search in title or content (case-insensitive)
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { content: new RegExp(search, "i") },
      ];
    }

    // Fetch & sort (pinned first, then recent)
    const notes = await Note.find(query).sort({ pinned: -1, createdAt: -1 });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const { title, content, color } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content, color }, // Include color here
      { new: true }
    );
    if (!note)
      return res.status(404).json({ error: "Note not found or unauthorized" });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    note.deleted = true;
    await note.save();
    res.status(200).json({ message: "Note moved to trash" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle archive
exports.updateArchive = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) return res.status(404).json({ error: "Note not found" });

    note.archived = !note.archived;
    await note.save();

    res.status(200).json({
      message: `Note ${note.archived ? "archived" : "unarchived"}`,
      note,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Trashed Notes
exports.getTrashedNotes = async (req, res) => {
  try {
    const trashed = await Note.find({ userId: req.user._id, deleted: true }).sort({ createdAt: -1 });
    res.status(200).json(trashed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Permanently Delete Notes
exports.permanentDeleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
      deleted: true, // Only allow delete if it's already trashed
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found in trash' });
    }

    await Note.findByIdAndDelete(note._id);
    res.status(200).json({ message: 'Note permanently deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Empty Trash
exports.emptyTrash = async (req, res) => {
  try {
    const result = await Note.deleteMany({
      userId: req.user._id,
      deleted: true,
    });

    res.status(200).json({
      message: `Trash emptied (${result.deletedCount} notes deleted)`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
