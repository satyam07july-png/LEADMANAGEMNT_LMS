import { body } from "express-validator";
import ROLES from "../constants/roles.js";

export const createEmployeeValidator = [

  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Full name must be between 3 and 150 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required.")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid mobile number."),

  body("department_id")
    .notEmpty()
    .withMessage("Department is required.")
    .isInt({ min: 1 })
    .withMessage("Invalid department."),

  body("designation")
    .trim()
    .notEmpty()
    .withMessage("Designation is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Designation must be between 2 and 100 characters."),

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(Object.values(ROLES))
    .withMessage("Invalid role."),

  body("employment_type")
    .notEmpty()
    .withMessage("Employment type is required.")
    .isIn([
      "FULL_TIME",
      "PART_TIME",
      "INTERN",
      "CONTRACT",
    ])
    .withMessage("Invalid employment type."),

  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn([
      "ACTIVE",
      "INACTIVE",
      "ON_LEAVE",
      "RESIGNED",
      "TERMINATED",
    ])
    .withMessage("Invalid status."),

  body("joining_date")
    .notEmpty()
    .withMessage("Joining date is required.")
    .isISO8601()
    .withMessage("Joining date must be a valid date."),

  body("date_of_birth")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  body("gender")
    .optional({ nullable: true })
    .isIn([
      "MALE",
      "FEMALE",
      "OTHER",
    ])
    .withMessage("Invalid gender."),

  body("address")
    .optional({ nullable: true })
    .isLength({ max: 500 })
    .withMessage("Address cannot exceed 500 characters."),

  body("emergency_contact_name")
    .optional({ nullable: true })
    .isLength({ min: 2, max: 150 })
    .withMessage("Emergency contact name is invalid."),

  body("emergency_contact")
    .optional({ nullable: true })
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid emergency contact number."),

  body("profile_image")
    .optional({ nullable: true })
    .isURL()
    .withMessage("Profile image must be a valid URL.")

];

export const updateEmployeeValidator = [
  body("full_name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Full name must be between 3 and 150 characters."),

  body("mobile")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid mobile number."),

  body("designation")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Invalid designation."),

  body("role")
    .optional()
    .isIn(["ADMIN", "MANAGER", "COUNSELLOR"])
    .withMessage("Invalid role."),

  body("employment_type")
    .optional()
    .isIn([
      "FULL_TIME",
      "PART_TIME",
      "INTERN",
      "CONTRACT",
    ])
    .withMessage("Invalid employment type."),

  body("status")
    .optional()
    .isIn([
      "ACTIVE",
      "INACTIVE",
      "ON_LEAVE",
      "RESIGNED",
      "TERMINATED",
    ])
    .withMessage("Invalid status."),
];