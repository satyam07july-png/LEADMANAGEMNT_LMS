import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import morgan from "morgan";

import validateEnv from "./config/env.js";

/* Routes */
import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import healthRoutes from "./routes/health.routes.js";
import leadCaptureRoutes from "./routes/leadCaptureRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import leadAssignmentRoutes
from "./routes/leadAssignmentRoutes.js";
import followupRoutes
from "./routes/followupRoutes.js";

/* Middlewares */
import { globalLimiter } from "./middleware/rateLimiter.js";
import requestId from "./middleware/requestId.js";
import requestLogger from "./middleware/requestLogger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

/**
 * =====================================================
 * Environment Validation
 * =====================================================
 */
validateEnv();

/**
 * =====================================================
 * Core Middlewares
 * =====================================================
 */
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * =====================================================
 * Security Middlewares
 * =====================================================
 */
app.use(helmet());

app.use(compression());

app.use(hpp());

app.use(globalLimiter);

/**
 * =====================================================
 * Logging
 * =====================================================
 */
app.use(requestId);

app.use(requestLogger);

app.use(morgan("dev"));

/**
 * =====================================================
 * Root Endpoint
 * =====================================================
 */
app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "IEM LMS API Running Successfully 🚀",

    version: "1.0.0",

  });

});

/**
 * =====================================================
 * Health Routes
 * =====================================================
 */
app.use("/api", healthRoutes);

/**
 * =====================================================
 * API Routes
 * =====================================================
 */
app.use("/api/auth", authRoutes);

app.use("/api/campaigns", campaignRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/leads", leadRoutes);

app.use(
  "/api/public",
  leadCaptureRoutes
);

app.use(
"/api/lead-assignments",
leadAssignmentRoutes
);

app.use("/api/dashboard", dashboardRoutes);

app.use(
    "/api/followups",
    followupRoutes
);

/**
 * =====================================================
 * 404 Handler
 * =====================================================
 */
app.use(notFound);

/**
 * =====================================================
 * Global Error Handler
 * =====================================================
 */
app.use(errorHandler);

export default app;