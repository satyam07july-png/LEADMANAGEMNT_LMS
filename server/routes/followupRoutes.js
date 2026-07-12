import express from "express";

import verifyToken from "../middleware/authMiddleware.js";

import {
  createFollowup,
  updateFollowup,
  completeFollowup,
  rescheduleFollowup,
  deleteFollowup,
  getLeadFollowups,
  getPendingFollowups,
  getTodayFollowups,
  getOverdueFollowups,
  getCompletedFollowups,
  getUpcomingFollowups,
  getMissedFollowups,
  getEmployeeFollowups,
  getFollowupStatistics,
} from "../controllers/followupController.js";
const router = express.Router();

/**
 * ============================================
 * Create Follow-up
 * ============================================
 */
router.post(
    "/",
    verifyToken,
    createFollowup
);

/**
 * ============================================
 * Lead Follow-up History
 * ============================================
 */
router.get(
    "/lead/:leadId",
    verifyToken,
    getLeadFollowups
);

/**
 * ============================================
 * Pending Follow-ups
 * ============================================
 */
router.get(
    "/pending",
    verifyToken,
    getPendingFollowups
);

/**
 * ============================================
 * Today's Follow-ups
 * ============================================
 */
router.get(
    "/today",
    verifyToken,
    getTodayFollowups
);

/**
 * ============================================
 * Overdue Follow-ups
 * ============================================
 */
router.get(
    "/overdue",
    verifyToken,
    getOverdueFollowups
);

router.put(
    "/:id",
    verifyToken,
    updateFollowup
);


router.patch(
  "/:id/complete",
  verifyToken,
  completeFollowup
);

router.patch(
  "/:id/reschedule",
  verifyToken,
  rescheduleFollowup
);

router.delete(
  "/:id",
  verifyToken,
  deleteFollowup
);

export default router;