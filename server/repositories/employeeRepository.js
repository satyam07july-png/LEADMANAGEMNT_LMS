import pool from "../config/db.js";
export const createEmployeeRepository = async (client, employeeData) => {
  const {
    user_id,
    employee_code,
    phone,
    designation,
    joining_date,
  } = employeeData;

  const query = `
    INSERT INTO employees (
      user_id,
      employee_code,
      phone,
      designation,
      joining_date
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;

  const values = [
    user_id,
    employee_code,
    phone,
    designation,
    joining_date,
  ];

  const result = await client.query(query, values);

  return result.rows[0];
};

export const getAllEmployeesRepository = async () => {
  const query = `
    SELECT
      e.id,
      e.employee_code,
      u.full_name,
      u.email,
      e.phone,
      e.designation,
      e.joining_date,
      e.status,
      e.created_at
    FROM employees e
    INNER JOIN users u
      ON e.user_id = u.id
    WHERE e.status = TRUE
    ORDER BY e.created_at DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const getEmployeeByIdRepository = async (id) => {
  const query = `
    SELECT
      e.id,
      e.employee_code,
      u.full_name,
      u.email,
      e.phone,
      e.designation,
      e.joining_date,
      e.status
    FROM employees e
    INNER JOIN users u
      ON e.user_id = u.id
    WHERE e.id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const findEmployeeByPhoneRepository = async (phone) => {
  const result = await pool.query(
    "SELECT * FROM employees WHERE phone = $1",
    [phone]
  );

  return result.rows[0];
};

export const updateEmployeeRepository = async (id, employeeData) => {
  const {
    phone,
    designation,
    joining_date,
  } = employeeData;

  const query = `
    UPDATE employees
    SET
      phone = $1,
      designation = $2,
      joining_date = $3,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;

  const result = await pool.query(query, [
    phone,
    designation,
    joining_date,
    id,
  ]);

  return result.rows[0];
};

export const deleteEmployeeRepository = async (id) => {
  const query = `
    UPDATE employees
    SET
      status = FALSE,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

/**
 * Get Last Employee
 */
export const getLastEmployeeRepository = async () => {
  const query = `
    SELECT employee_code
    FROM employees
    ORDER BY id DESC
    LIMIT 1;
  `;

  const result = await pool.query(query);

  return result.rows[0];
};