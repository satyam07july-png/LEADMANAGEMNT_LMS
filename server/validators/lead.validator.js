import { body, param, query, validationResult } from "express-validator";

import {
  LEAD_STATUS,
  LEAD_SOURCE,
  LEAD_PRIORITY,
} from "../constants/lead.constants.js";

/**
 * =====================================================
 * Validation Result
 * =====================================================
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

/**
 * =====================================================
 * ID Validator
 * =====================================================
 */
export const idValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Invalid Lead ID"),

  validate,
];

/**
 * =====================================================
 * Create Lead Validator
 * =====================================================
 */
export const createLeadValidator = [

  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Full name must be between 3 and 150 characters"),

  body("phone")
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid mobile number"),

  body("email")
    .optional({ nullable: true })
    .isEmail()
    .withMessage("Invalid email"),

  body("course_id")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("Invalid course"),

  body("source")
    .isIn(Object.values(LEAD_SOURCE))
    .withMessage("Invalid lead source"),

  body("remarks")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters"),

  body("next_followup_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid follow-up date"),

  validate,
];

/**
 * =====================================================
 * Update Lead Validator
 * =====================================================
 */
export const updateLeadValidator = [

  body("full_name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 }),

  body("phone")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid mobile number"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),

  body("course_id")
    .optional()
    .isInt({ min: 1 }),

  body("source")
    .optional()
    .isIn(Object.values(LEAD_SOURCE))
    .withMessage("Invalid lead source"),

  body("status")
    .optional()
    .isIn(Object.values(LEAD_STATUS))
    .withMessage("Invalid lead status"),

  body("priority")
    .optional()
    .isIn(Object.values(LEAD_PRIORITY))
    .withMessage("Invalid priority"),

  body("remarks")
    .optional()
    .isLength({ max: 1000 }),

  body("next_followup_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid follow-up date"),

  validate,
];

/**
 * =====================================================
 * Update Status
 * =====================================================
 */
export const updateLeadStatusValidator = [

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(LEAD_STATUS))
    .withMessage("Invalid lead status"),

  validate,
];

/**
 * =====================================================
 * Assign Lead
 * =====================================================
 */
export const assignLeadValidator = [

  body("employee_id")
    .isInt({ min: 1 })
    .withMessage("Valid employee_id is required"),

  validate,
];

/**
 * =====================================================
 * Update Priority
 * =====================================================
 */
export const updateLeadPriorityValidator = [

  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(Object.values(LEAD_PRIORITY))
    .withMessage("Invalid priority"),

  validate,
];

/**
 * =====================================================
 * Update Follow-up
 * =====================================================
 */
export const updateLeadFollowupValidator = [

  body("next_followup_date")
    .notEmpty()
    .withMessage("Follow-up date is required")
    .isISO8601()
    .withMessage("Invalid follow-up date"),

  body("last_contacted_at")
    .optional()
    .isISO8601()
    .withMessage("Invalid last contacted date"),

  validate,
];

/**
 * =====================================================
 * Lead List Query Validator
 * =====================================================
 */
export const leadQueryValidator = [

  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }),

  query("status")
    .optional()
    .isIn(Object.values(LEAD_STATUS)),

  query("priority")
    .optional()
    .isIn(Object.values(LEAD_PRIORITY)),

  query("source")
    .optional()
    .isIn(Object.values(LEAD_SOURCE)),

  validate,
];