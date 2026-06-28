/**
 * =====================================================
 * Module : Course
 * Layer  : Controller
 * Project: IEM LMS
 * =====================================================
 */

import {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
} from "../services/courseService.js";

/**
 * Create Course
 */
export const createCourse = async (req, res) => {
  try {
    const course = await createCourseService(req.body);

    return res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      data: course,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Courses
 */
/**
 * Get All Courses
 */
export const getAllCourses = async (req, res) => {
  try {
    const result = await getAllCoursesService(req.query);

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: result.courses,
      pagination: {
        page: result.page,
        limit: result.limit,
        totalRecords: result.total,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Course By ID
 */
export const getCourseById = async (req, res) => {
  try {
    const course = await getCourseByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Course Found",
      data: course,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Course
 */
export const updateCourse = async (req, res) => {
  try {
    const course = await updateCourseService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      data: course,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Course (Soft Delete)
 */
export const deleteCourse = async (req, res) => {
  try {
    const course = await deleteCourseService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
      data: course,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


