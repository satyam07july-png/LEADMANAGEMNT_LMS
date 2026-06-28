/**
 * =====================================================
 * Module : Course
 * Layer  : Service
 * Project: IEM LMS
 * =====================================================
 */

import {
  createCourseRepository,
  findCourseByCodeRepository,
  getAllCoursesRepository,
  getCourseByIdRepository,
  updateCourseRepository,
  deleteCourseRepository,
} from "../repositories/courseRepository.js";

/**
 * Create Course
 */
export const createCourseService = async (courseData) => {
  const existingCourse = await findCourseByCodeRepository(
    courseData.course_code
  );

  if (existingCourse) {
    throw new Error("Course Code Already Exists");
  }

  return await createCourseRepository(courseData);
};

/**
 * Get All Courses
 */
export const getAllCoursesService = async (query) => {
  return await getAllCoursesRepository(query);
};
/**
 * Get Course By ID
 */
export const getCourseByIdService = async (id) => {
  const course = await getCourseByIdRepository(id);

  if (!course) {
    throw new Error("Course Not Found");
  }

  return course;
};

/**
 * Update Course
 */
export const updateCourseService = async (id, courseData) => {
  const course = await updateCourseRepository(id, courseData);

  if (!course) {
    throw new Error("Course Not Found");
  }

  return course;
};

/**
 * Delete Course
 */
export const deleteCourseService = async (id) => {
  const course = await deleteCourseRepository(id);

  if (!course) {
    throw new Error("Course Not Found");
  }

  return course;
};


