const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // Array of tags/hashtags
      default: [],
    },
    pinned: {
      type: Boolean, // To mark important notes
      default: false,
    },
    color: {
      type: String, // Optional background color (hex or name)
      default: "#ffffff",
    },
    archived: {
      type: Boolean, // For archive functionality
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
