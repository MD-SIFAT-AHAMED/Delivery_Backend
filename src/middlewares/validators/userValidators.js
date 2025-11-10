const { body, validationResult } = require("express-validator");

exports.createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Invalid email address"),

  body("role").isIn(["user"]).withMessage("Invalid role"),

  body("is_active")
    .optional()
    .isBoolean()
    .withMessage("Is_active must be true or false"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
