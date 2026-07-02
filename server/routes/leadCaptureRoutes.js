import express from "express";

import validate from "../middleware/validate.js";

import {
  capturePublicLeadValidator,
} from "../validators/leadCapture.validator.js";

import {
  capturePublicLead,
} from "../controllers/leadCaptureController.js";

const router = express.Router();

/**
 * =====================================================
 * Public Lead Capture
 * =====================================================
 */

router.post(

  "/leads",

  capturePublicLeadValidator,

  validate,

  capturePublicLead

);

export default router;