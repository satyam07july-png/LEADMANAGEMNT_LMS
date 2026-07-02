import pool from "../config/db.js";

export const getNextEmployeeCodeRepository = async (
    client
) => {

    const query = `
        SELECT nextval(
            'employee_code_seq'
        ) AS sequence;
    `;

    const result =
    await client.query(query);

    return result.rows[0].sequence;

};

export const createEmployeeRepository = async (
  client,
  employee
) => {

  const query = `
    INSERT INTO employees (

      employee_code,
      full_name,
      email,
      mobile,
      department_id,
      designation,
      role,
      employment_type,
      status,
      joining_date,
      date_of_birth,
      gender,
      profile_image,
      address,
      emergency_contact_name,
      emergency_contact,
      created_by

    )

    VALUES (

      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
      $11,$12,$13,$14,$15,$16,$17

    )

    RETURNING *;
  `;

  const values = [

    employee.employee_code,
    employee.full_name,
    employee.email,
    employee.mobile,
    employee.department_id,
    employee.designation,
    employee.role,
    employee.employment_type,
    employee.status,
    employee.joining_date,
    employee.date_of_birth,
    employee.gender,
    employee.profile_image,
    employee.address,
    employee.emergency_contact_name,
    employee.emergency_contact,
    employee.created_by,

  ];

  const result = await client.query(query, values);

  return result.rows[0];

};

export const findEmployeeByEmailRepository = async (
  email
) => {

  const query = `
    SELECT *
    FROM employees
    WHERE email = $1
    AND is_deleted = FALSE;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];

};

export const findEmployeeByIdRepository = async (
  id
) => {

  const query = `
    SELECT *
    FROM employees
    WHERE id = $1
    AND is_deleted = FALSE;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

};

export const getEmployeesRepository = async (filters) => {

  const {
    page = 1,
    limit = 10,
    search = "",
    role,
    status,
    employment_type,
    sortBy = "created_at",
    order = "DESC",
  } = filters;

  let query = `
    SELECT *
    FROM employees
    WHERE is_deleted = FALSE
  `;

  const values = [];
  let index = 1;

  // Search
  if (search) {
    query += `
      AND (
        employee_code ILIKE $${index}
        OR full_name ILIKE $${index}
        OR email ILIKE $${index}
        OR mobile ILIKE $${index}
      )
    `;
    values.push(`%${search}%`);
    index++;
  }

  // Role Filter
  if (role) {
    query += ` AND role = $${index}`;
    values.push(role);
    index++;
  }

  // Status Filter
  if (status) {
    query += ` AND status = $${index}`;
    values.push(status);
    index++;
  }

  // Employment Type
  if (employment_type) {
    query += ` AND employment_type = $${index}`;
    values.push(employment_type);
    index++;
  }

  // Total Count Query
  const countQuery = query.replace(
    "SELECT *",
    "SELECT COUNT(*)"
  );

  const countResult = await pool.query(
    countQuery,
    values
  );

  const totalRecords = Number(
    countResult.rows[0].count
  );

  // Sorting
  const allowedSort = [
    "created_at",
    "full_name",
    "employee_code",
  ];

  const sortColumn = allowedSort.includes(sortBy)
    ? sortBy
    : "created_at";

  const sortOrder =
    order.toUpperCase() === "ASC"
      ? "ASC"
      : "DESC";

  query += `
    ORDER BY ${sortColumn} ${sortOrder}
    LIMIT $${index}
    OFFSET $${index + 1}
  `;

  values.push(limit);
  values.push((page - 1) * limit);

  const result = await pool.query(
    query,
    values
  );

  return {
    employees: result.rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
    },
  };

};

export const updateEmployeeRepository = async (
  client,
  id,
  employee
) => {

  const query = `
    UPDATE employees

    SET

      full_name = $1,
      mobile = $2,
      department_id = $3,
      designation = $4,
      role = $5,
      employment_type = $6,
      status = $7,
      updated_by = $8,
      updated_at = CURRENT_TIMESTAMP

    WHERE id = $9

    RETURNING *;
  `;

  const values = [

    employee.full_name,
    employee.mobile,
    employee.department_id,
    employee.designation,
    employee.role,
    employee.employment_type,
    employee.status,
    employee.updated_by,
    id,

  ];

  const result = await client.query(query, values);

  return result.rows[0];

};

export const deleteEmployeeRepository = async (
  client,
  id,
  updatedBy
) => {

  const query = `
    UPDATE employees

    SET

      is_deleted = TRUE,

      updated_by = $1,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $2

    RETURNING *;
  `;

  const result = await client.query(query, [

    updatedBy,

    id,

  ]);

  return result.rows[0];

};
export const restoreEmployeeRepository = async (
  client,
  id,
  updatedBy
) => {

  const query = `
    UPDATE employees

    SET

      is_deleted = FALSE,

      updated_by = $1,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $2

    RETURNING *;
  `;

  const result = await client.query(query, [

    updatedBy,

    id,

  ]);

  return result.rows[0];

};

export const findEmployeeByMobileRepository = async (
  mobile
) => {

  const query = `
    SELECT *

    FROM employees

    WHERE mobile = $1

    AND is_deleted = FALSE;
  `;

  const result = await pool.query(query, [mobile]);

  return result.rows[0];

};

export const getLastEmployeeCodeRepository = async (client) => {

  const result = await client.query(`
    SELECT nextval('employee_code_seq') AS sequence;
  `);

  return result.rows[0].sequence;

};

export const getEmployeeStatisticsRepository = async () => {

  const query = `
    SELECT

      COUNT(*) FILTER (WHERE is_deleted = FALSE) AS total_employees,

      COUNT(*) FILTER (
        WHERE status = 'ACTIVE'
        AND is_deleted = FALSE
      ) AS active_employees,

      COUNT(*) FILTER (
        WHERE status = 'INACTIVE'
        AND is_deleted = FALSE
      ) AS inactive_employees,

      COUNT(*) FILTER (
        WHERE status = 'ON_LEAVE'
        AND is_deleted = FALSE
      ) AS on_leave_employees,

      COUNT(*) FILTER (
        WHERE status = 'TERMINATED'
        AND is_deleted = FALSE
      ) AS terminated_employees,

      COUNT(*) FILTER (
        WHERE role = 'ADMIN'
        AND is_deleted = FALSE
      ) AS admins,

      COUNT(*) FILTER (
        WHERE role = 'MANAGER'
        AND is_deleted = FALSE
      ) AS managers,

      COUNT(*) FILTER (
        WHERE role = 'COUNSELLOR'
        AND is_deleted = FALSE
      ) AS counsellors

    FROM employees;
  `;

  const result = await pool.query(query);

  return result.rows[0];

};

