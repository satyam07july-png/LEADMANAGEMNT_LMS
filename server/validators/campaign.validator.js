import { body, param } from "express-validator";

export const createCampaignValidator = [

  body("campaign_name")
    .trim()
    .notEmpty()
    .withMessage("Campaign name is required.")
    .isLength({ min: 3, max: 200 }),

  body("platform")
    .trim()
    .notEmpty()
    .withMessage("Platform is required.")
    .isIn([
      "META",
      "GOOGLE",
      "INSTAGRAM",
      "YOUTUBE",
      "WEBSITE",
      "WHATSAPP",
      "OFFLINE"
    ])
    .withMessage("Invalid platform."),

  body("source")
    .optional()
    .trim()
    .isLength({ max: 100 }),

  body("budget")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Budget must be greater than or equal to 0."),

  body("landing_page_url")
    .optional()
    .isURL()
    .withMessage("Invalid landing page URL."),

  body("description")
    .optional()
    .isLength({ max: 1000 }),

  body("start_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date."),

  body("end_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date."),

  body("status")
    .optional()
    .isIn([
      "ACTIVE",
      "INACTIVE",
      "COMPLETED"
    ])
    .withMessage("Invalid campaign status.")

];

export const updateCampaignValidator = [

  param("id")
    .isInt()
    .withMessage("Invalid campaign id."),

  body("campaign_name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }),

  body("platform")
    .optional()
    .isIn([
      "META",
      "GOOGLE",
      "INSTAGRAM",
      "YOUTUBE",
      "WEBSITE",
      "WHATSAPP",
      "OFFLINE"
    ]),

  body("source")
    .optional()
    .trim()
    .isLength({ max: 100 }),

  body("budget")
    .optional()
    .isFloat({ min: 0 }),

  body("landing_page_url")
    .optional()
    .isURL(),

  body("description")
    .optional()
    .isLength({ max: 1000 }),

  body("start_date")
    .optional()
    .isISO8601(),

  body("end_date")
    .optional()
    .isISO8601(),

  body("status")
    .optional()
    .isIn([
      "ACTIVE",
      "INACTIVE",
      "COMPLETED"
    ])

];

export const campaignIdValidator = [

  param("id")
    .isInt()
    .withMessage("Invalid campaign id.")

];