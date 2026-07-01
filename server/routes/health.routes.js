import express from "express";

import {
    health,
    readiness,
    liveness,
} from "../controllers/health.controller.js";

const router = express.Router();

router.get("/health", health);

router.get("/ready", readiness);

router.get("/live", liveness);

export default router;