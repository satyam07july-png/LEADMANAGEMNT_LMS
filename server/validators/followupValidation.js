import { body, param } from "express-validator";

export const createFollowupValidation = [

    body("lead_id")
        .isInt({ min: 1 })
        .withMessage("Valid lead is required."),

    body("employee_id")
        .isInt({ min: 1 })
        .withMessage("Valid employee is required."),

    body("followup_type")
        .isIn([
            "CALL",
            "EMAIL",
            "WHATSAPP",
            "SMS",
            "MEETING",
            "VISIT"
        ])
        .withMessage("Invalid follow-up type."),

    body("status")
        .optional()
        .isIn([
            "PENDING",
            "COMPLETED",
            "MISSED",
            "RESCHEDULED",
            "CANCELLED"
        ]),

    body("priority")
        .optional()
        .isIn([
            "LOW",
            "MEDIUM",
            "HIGH"
        ]),

    body("next_followup_at")
        .isISO8601()
        .withMessage("Invalid follow-up date."),

    body("remarks")
        .optional()
        .isLength({
            max: 1000
        })

];