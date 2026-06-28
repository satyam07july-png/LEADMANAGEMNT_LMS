import express from "express";

import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import validate from "../middleware/validate.js";
import { createCourseValidation } from "../validators/courseValidator.js";

const router = express.Router();

/**
 * =====================================================
 * Module : Course Routes
 * Project: IEM LMS
 * =====================================================
 */

/**
 * Create Course
 * POST /api/v1/courses
 */
router.post(
  "/",
  createCourseValidation,
  validate,
  createCourse
);

/**
 * Get All Courses
 * GET /api/v1/courses
 * Query Params:
 * page
 * limit
 * search
 * sort
 * order
 * status
 */
router.get("/", getAllCourses);

/**
 * Get Course By ID
 * GET /api/v1/courses/:id
 */
router.get("/:id", getCourseById);

/**
 * Update Course
 * PUT /api/v1/courses/:id
 */
router.put("/:id", updateCourse);

/**
 * Soft Delete Course
 * DELETE /api/v1/courses/:id
 */
router.delete("/:id", deleteCourse);

export default router;