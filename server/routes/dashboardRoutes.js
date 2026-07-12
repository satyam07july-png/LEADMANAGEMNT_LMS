import express from "express";

import verifyToken from "../middleware/authMiddleware.js";

import {
    getDashboardOverview,
    getLeadAnalytics,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
    "/overview",
    verifyToken,
    getDashboardOverview
);

router.get(
    "/lead-analytics",
    verifyToken,
    getLeadAnalytics
);

export default router;