import { body, param } from "express-validator";

export const assignLeadValidation = [

  param("leadId")
    .isInt({ min: 1 })
    .withMessage("Valid lead ID is required."),

  body("employee_id")
    .isInt({ min: 1 })
    .withMessage("Valid counsellor is required."),

  body("remarks")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Remarks cannot exceed 500 characters.")

];