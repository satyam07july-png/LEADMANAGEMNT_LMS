import { body, param } from "express-validator";

export const createLeadValidator = [

  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 150 }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email."),

  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile is required.")
    .isLength({ min: 10, max: 15 }),

  body("course_id")
    .optional()
    .isInt()
    .withMessage("Invalid course."),

  body("assigned_to")
    .optional()
    .isInt()
    .withMessage("Invalid employee."),

  body("source")
    .notEmpty()
    .withMessage("Lead source is required."),

  body("status")
    .optional()
    .isIn([
      "NEW",
      "CONTACTED",
      "FOLLOW_UP",
      "QUALIFIED",
      "ADMISSION_DONE",
      "LOST",
    ]),

  body("priority")
    .optional()
    .isIn([
      "LOW",
      "MEDIUM",
      "HIGH",
    ]),

];

export const updateLeadValidator = [

  param("id")
    .isInt()
    .withMessage("Invalid lead id."),

  body("full_name")
    .optional()
    .isLength({ min: 3, max: 150 }),

  body("email")
    .optional()
    .isEmail(),

  body("mobile")
    .optional()
    .isLength({ min: 10, max: 15 }),

  body("status")
    .optional()
    .isIn([
      "NEW",
      "CONTACTED",
      "FOLLOW_UP",
      "QUALIFIED",
      "ADMISSION_DONE",
      "LOST",
    ]),

];

export const assignLeadValidator = [

  param("id")
    .isInt()
    .withMessage("Invalid lead id."),

  body("employee_id")
    .isInt()
    .withMessage("Employee id is required."),

];

export const updateLeadStatusValidator = [

  param("id")
    .isInt(),

  body("status")
    .isIn([
      "NEW",
      "CONTACTED",
      "FOLLOW_UP",
      "QUALIFIED",
      "ADMISSION_DONE",
      "LOST",
    ])
    .withMessage("Invalid lead status."),

];

export const addLeadNoteValidator = [

  param("id")
    .isInt(),

  body("note")
    .trim()
    .notEmpty()
    .withMessage("Note is required.")
    .isLength({
      min: 3,
      max: 1000,
    }),

];