import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

//import employeeRoutes from "./routes/employeeRoutes.js";
//import leadRoutes from "./routes/leadRoutes.js";
//import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

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

// Error Handler (Always Last)
app.use(errorHandler);

//app.use("/api/employees", employeeRoutes);
//app.use("/api/leads", leadRoutes);
//app.use("/api/dashboard", dashboardRoutes);

export default app;