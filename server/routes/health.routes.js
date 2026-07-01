import express from "express";

import {
  healthCheck,
} from "../controllers/health.controller.js";

const router = express.Router();

/**
 * =====================================================
 * Health Check
 * =====================================================
 */

router.get("/", healthCheck);

export default router;