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

  body("weight").custom((value, { req }) => {
    if (
      req.body.type === "Non-Document" &&
      (value === undefined || value === null || value === "")
    ) {
      throw new Error("Weight is required for Non-Document parcels");
    }

    if (value !== undefined && value !== null && value !== "") {
      const floatVal = parseFloat(value);
      if (isNaN(floatVal) || floatVal < 0) {
        throw new Error("Weight must be a positive number");
      }
    }

    return true;
  }),

  // body("cost")
  //   .notEmpty()
  //   .withMessage("Cost is required")
  //   .isFloat({ min: 0 })
  //   .withMessage("Cost must be a positive number"),

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
    .isIn([
      "Pending",
      "Assigned",
      "Picked",
      "In_transit",
      "Delivered",
      "Cancelled",
    ])
    .withMessage("Invalid delivery status"),

  body("payment_status")
    .notEmpty()
    .withMessage("Payment status is required")
    .isIn(["Paid", "UnPaid", "pending"])
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
