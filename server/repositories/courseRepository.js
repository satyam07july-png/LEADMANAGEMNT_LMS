import pool from "../config/db.js";

/**
 * =====================================================
 * Module : Course
 * Layer  : Repository
 * Project: IEM LMS
 * =====================================================
 */

/**
 * Create Course
 */
export const createCourseRepository = async (courseData) => {
  const {
    department_id,
    course_name,
    course_code,
    description,
    duration,
    fees,
  } = courseData;

  const query = `
    INSERT INTO courses (
      department_id,
      course_name,
      course_code,
      description,
      duration,
      fees
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    department_id,
    course_name,
    course_code,
    description,
    duration,
    fees,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

/**
 * Find Course By Code
 */
export const findCourseByCodeRepository = async (courseCode) => {
  const result = await pool.query(
    "SELECT * FROM courses WHERE course_code = $1",
    [courseCode]
  );

  return result.rows[0];
};

/**
 * Get All Courses
 */
/**
 * Get All Courses (Search + Pagination + Sorting + Filter)
 */
export const getAllCoursesRepository = async ({
  page = 1,
  limit = 10,
  search = "",
  sort = "id",
  order = "DESC",
  status,
}) => {
  const offset = (page - 1) * limit;

  // Allowed sorting fields (Security)
  const allowedSortFields = [
    "id",
    "course_name",
    "course_code",
    "fees",
    "created_at",
  ];

  const sortField = allowedSortFields.includes(sort)
    ? sort
    : "id";

  const sortOrder =
    order.toUpperCase() === "ASC" ? "ASC" : "DESC";

  let query = `
    SELECT
      c.id,
      c.department_id,
      d.department_name,
      c.course_name,
      c.course_code,
      c.description,
      c.duration,
      c.fees,
      c.status,
      c.created_at,
      c.updated_at
    FROM courses c
    INNER JOIN departments d
      ON c.department_id = d.id
    WHERE 1 = 1
  `;

  const values = [];
  let index = 1;

  // Search
  if (search) {
    query += `
      AND (
        c.course_name ILIKE $${index}
        OR c.course_code ILIKE $${index}
        OR c.description ILIKE $${index}
      )
    `;
    values.push(`%${search}%`);
    index++;
  }

  // Status Filter
  if (status !== undefined) {
    query += ` AND c.status = $${index}`;
    values.push(status === "true");
    index++;
  }

  // Sorting
  query += ` ORDER BY c.${sortField} ${sortOrder}`;

  // Pagination
  query += ` LIMIT $${index} OFFSET $${index + 1}`;

  values.push(Number(limit));
  values.push(offset);

  const result = await pool.query(query, values);

  // Total Records
  let countQuery = `
    SELECT COUNT(*) AS total
    FROM courses c
    WHERE 1 = 1
  `;

  const countValues = [];
  let countIndex = 1;

  if (search) {
    countQuery += `
      AND (
        c.course_name ILIKE $${countIndex}
        OR c.course_code ILIKE $${countIndex}
        OR c.description ILIKE $${countIndex}
      )
    `;
    countValues.push(`%${search}%`);
    countIndex++;
  }

  if (status !== undefined) {
    countQuery += ` AND c.status = $${countIndex}`;
    countValues.push(status === "true");
  }

  const countResult = await pool.query(countQuery, countValues);

  return {
    courses: result.rows,
    total: Number(countResult.rows[0].total),
    page: Number(page),
    limit: Number(limit),
  };
};

/**
 * Get Course By ID
 */
export const getCourseByIdRepository = async (id) => {
  const query = `
    SELECT
      c.id,
      c.department_id,
      d.department_name,
      c.course_name,
      c.course_code,
      c.description,
      c.duration,
      c.fees,
      c.status,
      c.created_at,
      c.updated_at
    FROM courses c
    INNER JOIN departments d
      ON c.department_id = d.id
    WHERE c.id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

/**
 * Update Course
 */
export const updateCourseRepository = async (id, courseData) => {
  const {
    department_id,
    course_name,
    course_code,
    description,
    duration,
    fees,
  } = courseData;

  const query = `
    UPDATE courses
    SET
      department_id = $1,
      course_name = $2,
      course_code = $3,
      description = $4,
      duration = $5,
      fees = $6,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *;
  `;

  const values = [
    department_id,
    course_name,
    course_code,
    description,
    duration,
    fees,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

/**
 * Delete Course (Soft Delete)
 */
export const deleteCourseRepository = async (id) => {
  const query = `
    UPDATE courses
    SET
      status = FALSE,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};