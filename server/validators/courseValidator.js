import { body } from "express-validator";

export const createCourseValidation = [
  body("department_id")
    .notEmpty()
    .withMessage("Department is required")
    .isInt()
    .withMessage("Department ID must be an integer"),

  body("course_name")
    .trim()
    .notEmpty()
    .withMessage("Course Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Course Name must be between 3 and 100 characters"),

  body("course_code")
    .trim()
    .notEmpty()
    .withMessage("Course Code is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("Course Code must be between 2 and 20 characters"),

  body("duration")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Duration is too long"),

  body("fees")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Fees must be a positive number"),
];