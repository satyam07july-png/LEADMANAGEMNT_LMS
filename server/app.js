import express from "express";
import cors from "cors";
import validateEnv from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import {
  helmetMiddleware,
  compressionMiddleware,
  loggerMiddleware,
  corsMiddleware,
  rateLimiter,
} from "./middleware/security.js";
import healthRoutes from "./routes/health.routes.js";


//import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

validateEnv();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IEM LMS API Running Successfully 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);

app.use("/api/leads", leadRoutes);
app.use("/api/health", healthRoutes);
//app.use("/api/dashboard", dashboardRoutes);

/**
 * Security
 */

app.use(helmetMiddleware);

app.use(compressionMiddleware);

app.use(loggerMiddleware);

app.use(corsMiddleware);

app.use(rateLimiter);

/* ------------ Not Found ------------ */

app.use(notFound);

// Error Handler (Always Last)
app.use(errorHandler);





export default app;