import Joi from "joi";

const FOLLOWUP_STATUS = [
  "PENDING",
  "COMPLETED",
  "MISSED",
  "CANCELLED",
];

const FOLLOWUP_PRIORITY = [
  "LOW",
  "MEDIUM",
  "HIGH",
];

const FOLLOWUP_OUTCOME = [
  "INTERESTED",
  "NOT_INTERESTED",
  "CALLBACK",
  "NO_RESPONSE",
  "ADMISSION_DONE",
];

export const createFollowupSchema = Joi.object({

  lead_id: Joi.number()
    .integer()
    .positive()
    .required(),

  employee_id: Joi.number()
    .integer()
    .positive()
    .required(),

  followup_type: Joi.string()
    .trim()
    .max(100)
    .required(),

  priority: Joi.string()
    .valid(...FOLLOWUP_PRIORITY)
    .default("MEDIUM"),

  next_followup_at: Joi.date()
    .greater("now")
    .required(),

  remarks: Joi.string()
    .trim()
    .allow("")
    .max(1000)

});

export const updateFollowupSchema = Joi.object({

  employee_id: Joi.number()
    .integer()
    .positive(),

  followup_type: Joi.string()
    .trim()
    .max(100),

  priority: Joi.string()
    .valid(...FOLLOWUP_PRIORITY),

  next_followup_at: Joi.date()
    .greater("now"),

  remarks: Joi.string()
    .trim()
    .allow("")
    .max(1000)

}).min(1);

export const completeFollowupSchema = Joi.object({

  outcome: Joi.string()
    .valid(...FOLLOWUP_OUTCOME)
    .required(),

  remarks: Joi.string()
    .trim()
    .allow("")
    .max(1000)

});

export const rescheduleFollowupSchema = Joi.object({

  next_followup_at: Joi.date()
    .greater("now")
    .required(),

  remarks: Joi.string()
    .trim()
    .allow("")
    .max(1000)

});

export const followupIdSchema = Joi.object({

  id: Joi.number()
    .integer()
    .positive()
    .required()

});

export const leadTimelineSchema = Joi.object({

  leadId: Joi.number()
    .integer()
    .positive()
    .required()

});

export const getFollowupsQuerySchema = Joi.object({

  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),

  search: Joi.string()
    .trim()
    .allow(""),

  status: Joi.string()
    .valid(...FOLLOWUP_STATUS),

  priority: Joi.string()
    .valid(...FOLLOWUP_PRIORITY),

  employee_id: Joi.number()
    .integer()
    .positive(),

  lead_id: Joi.number()
    .integer()
    .positive(),

  sortBy: Joi.string()
    .valid(
      "created_at",
      "next_followup_at",
      "priority",
      "status"
    )
    .default("created_at"),

  order: Joi.string()
    .valid("ASC", "DESC")
    .default("DESC")

});

export {
  createFollowupSchema,
  updateFollowupSchema,
  completeFollowupSchema,
  rescheduleFollowupSchema,
  followupIdSchema,
  leadTimelineSchema,
  getFollowupsQuerySchema,
};