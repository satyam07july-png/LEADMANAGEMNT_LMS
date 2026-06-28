import pool from "../config/db.js";

/**
 * Create Department
 */
export const createDepartmentRepository = async (departmentData) => {
  const { department_name, description } = departmentData;

  const query = `
    INSERT INTO departments
    (department_name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    department_name,
    description,
  ]);

  return result.rows[0];
};

/**
 * Find Department By Name
 */
export const findDepartmentByNameRepository = async (departmentName) => {
  const result = await pool.query(
    "SELECT * FROM departments WHERE department_name = $1",
    [departmentName]
  );

  return result.rows[0];
};

/**
 * Get All Departments
 */
export const getAllDepartmentsRepository = async () => {
  const result = await pool.query(
    "SELECT * FROM departments ORDER BY id DESC"
  );

  return result.rows;
};