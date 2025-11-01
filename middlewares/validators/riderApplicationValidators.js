const { body, validationResult } = require("express-validator");

exports.validateRiderApplication = [
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isString()
    .withMessage("User ID must be a string"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18, max: 60 })
    .withMessage("Age must be between 18 and 60"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("region").notEmpty().withMessage("Region is required"),

  body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .isMobilePhone()
    .withMessage("Invalid contact number"),

  body("nid")
    .notEmpty()
    .withMessage("NID number is required")
    .isLength({ min: 10, max: 20 })
    .withMessage("NID number must be between 10 to 20 characters"),

  body("license")
    .notEmpty()
    .withMessage("Driving license number is required")
    .isLength({ min: 5 })
    .withMessage("License number must be valid"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        data: errors.array(),
      });
    }
    next();
  },
];
