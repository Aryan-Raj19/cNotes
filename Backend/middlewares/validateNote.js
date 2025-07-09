const { body, validationResult } = require("express-validator");

exports.validateNote = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long"),

  // Middleware to handle errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
