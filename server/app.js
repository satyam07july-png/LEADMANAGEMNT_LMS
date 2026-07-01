import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import morgan from "morgan";

import validateEnv from "./config/env.js";

/* Routes */
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import healthRoutes from "./routes/health.routes.js";

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

app.use("/api/courses", courseRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/leads", leadRoutes);

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