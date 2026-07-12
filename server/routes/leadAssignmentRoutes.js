import express from "express";
import {
  assignLead,
  reassignLead,
  getLeadAssignmentHistory,
} from "../controllers/leadAssignmentController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
  "/:leadId/assign",
  verifyToken,
  assignLead
);

router.put(
  "/:leadId/reassign",
  verifyToken,
  reassignLead
);

router.get(
  "/:leadId/history",
  verifyToken,
  getLeadAssignmentHistory
);

export default router;