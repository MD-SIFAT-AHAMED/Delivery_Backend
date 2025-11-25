const { body, validationResult } = require("express-validator");

const parcelValidators = [
  body("title")
    .notEmpty()
    .withMessage("Parcel title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("type")
    .notEmpty()
    .withMessage("Parcel type is required")
    .isIn(["Document", "Non-Document"])
    .withMessage("Type must be either Document or Non-Document"),

  body("weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number"),

  body("cost")
    .notEmpty()
    .withMessage("Cost is required")
    .isFloat({ min: 0 })
    .withMessage("Cost must be a positive number"),

  body("senderName").notEmpty().withMessage("Sender name is required"),
  body("senderContact").notEmpty().withMessage("Sender contact is required"),
  body("senderRegion").notEmpty().withMessage("Sender region is required"),
  body("senderCenter").notEmpty().withMessage("Sender center is required"),
  body("senderAddress").notEmpty().withMessage("Sender address is required"),
  body("pickupInstruction")
    .notEmpty()
    .withMessage("Pickup instruction is required"),

  body("receiverName").notEmpty().withMessage("Receiver name is required"),
  body("receiverContact")
    .notEmpty()
    .withMessage("Receiver contact is required"),
  body("receiverRegion").notEmpty().withMessage("Receiver region is required"),
  body("receiverCenter").notEmpty().withMessage("Receiver center is required"),
  body("receiverAddress")
    .notEmpty()
    .withMessage("Receiver address is required"),
  body("deliveryInstruction")
    .notEmpty()
    .withMessage("Delivery instruction is required"),

  body("created_by").notEmpty().withMessage("Created_by is required"),

  body("delivery_status")
    .notEmpty()
    .withMessage("Delivery status is required")
    .isIn(["Not_collected", "In-transit", "Delivered"])
    .withMessage("Invalid delivery status"),

  body("payment_status")
    .notEmpty()
    .withMessage("Payment status is required")
    .isIn(["Paid", "UnPaid"])
    .withMessage("Invalid payment status"),

  // Custom middleware to check validation result
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

module.exports = parcelValidators;
