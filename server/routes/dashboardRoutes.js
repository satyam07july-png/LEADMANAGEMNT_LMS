import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import ROLES from "../constants/roles.js";

import {
  getDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

/**
 * =====================================================
 * Dashboard
 * =====================================================
 */

router.get(

  "/",

  authMiddleware,

  roleMiddleware(
    ROLES.ADMIN,
    ROLES.COUNSELLOR
  ),

  getDashboard

);

export default router;