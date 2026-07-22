import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import ROLES from "../constants/roles.js";

import {
  getEmployeeDashboard,
} from "../controllers/employeePortal.controller.js";

const router = express.Router();

/**
 * =====================================================
 * Employee Dashboard
 * =====================================================
 */

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.COUNSELLOR
  ),
  getEmployeeDashboard
);

export default router;