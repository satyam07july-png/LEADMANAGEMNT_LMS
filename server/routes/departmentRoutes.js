import express from "express";
import {
  createDepartment,
  getAllDepartments,
} from "../controllers/departmentController.js";

const router = express.Router();

// Create Department
router.post("/", createDepartment);

// Get All Departments
router.get("/", getAllDepartments);

export default router;