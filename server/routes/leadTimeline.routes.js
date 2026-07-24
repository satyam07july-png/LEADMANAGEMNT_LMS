import { Router } from "express";

import authenticate from "../middleware/authMiddleware.js";

import {
  getLeadTimelineController,
} from "../controllers/leadTimeline.controller.js";

const router = Router();

/**
 * =====================================================
 * Get Lead Timeline
 * =====================================================
 */

router.get(
  "/:leadId/timeline",
  authenticate,
  getLeadTimelineController
);

export default router;