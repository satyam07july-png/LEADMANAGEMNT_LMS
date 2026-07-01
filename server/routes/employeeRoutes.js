import express from "express";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

/**
 * ============================================
 * Employee (Counsellor) Routes
 * ============================================
 */

// Create Counsellor
router.post("/", createEmployee);

// Get All Counsellors
router.get("/", getAllEmployees);

// Get Counsellor By ID
router.get("/:id", getEmployeeById);

// Update Counsellor
router.put("/:id", updateEmployee);

// Deactivate Counsellor
router.delete("/:id", deleteEmployee);

export default router;