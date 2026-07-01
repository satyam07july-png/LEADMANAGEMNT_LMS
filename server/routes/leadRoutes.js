import express from "express";

import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  assignLead,
  updateLeadPriority,
  updateLeadFollowup,
  getDashboard,
  getTodayFollowups,
  getRecentLeads,
  getLeadAnalytics,
} from "../controllers/leadController.js";

import {
  createLeadValidator,
  updateLeadValidator,
  updateLeadStatusValidator,
  assignLeadValidator,
  idValidator,
} from "../validators/lead.validator.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================================
   Dashboard
========================================================== */

router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

router.get(
  "/dashboard/analytics",
  authMiddleware,
  getLeadAnalytics
);

router.get(
  "/dashboard/recent",
  authMiddleware,
  getRecentLeads
);

router.get(
  "/dashboard/followups",
  authMiddleware,
  getTodayFollowups
);

/* ==========================================================
   Lead CRUD
========================================================== */

router.post(
  "/",
  authMiddleware,
  createLeadValidator,
  createLead
);

router.get(
  "/",
  authMiddleware,
  getAllLeads
);

router.get(
  "/:id",
  authMiddleware,
  idValidator,
  getLeadById
);

router.put(
  "/:id",
  authMiddleware,
  idValidator,
  updateLeadValidator,
  updateLead
);

router.delete(
  "/:id",
  authMiddleware,
  idValidator,
  deleteLead
);

/* ==========================================================
   Lead Status
========================================================== */

router.patch(
  "/:id/status",
  authMiddleware,
  idValidator,
  updateLeadStatusValidator,
  updateLeadStatus
);

/* ==========================================================
   Lead Assignment
========================================================== */

router.patch(
  "/:id/assign",
  authMiddleware,
  idValidator,
  assignLeadValidator,
  assignLead
);

/* ==========================================================
   Lead Priority
========================================================== */

router.patch(
  "/:id/priority",
  authMiddleware,
  idValidator,
  updateLeadPriority
);

/* ==========================================================
   Lead Follow-up
========================================================== */

router.patch(
  "/:id/followup",
  authMiddleware,
  idValidator,
  updateLeadFollowup
);

export default router;