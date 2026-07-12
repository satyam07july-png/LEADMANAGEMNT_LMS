import pool from "../config/db.js";

/**
 * =====================================================
 * Create Assignment History
 * =====================================================
 */
export const createAssignmentHistoryRepository = async (
  client,
  assignmentData
) => {
  const {
    lead_id,
    assigned_by,
    assigned_to,
    previous_assigned_to,
    remarks,
  } = assignmentData;

  const query = `
    INSERT INTO lead_assignments (
      lead_id,
      assigned_by,
      assigned_to,
      previous_assigned_to,
      remarks
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      lead_id,
      assigned_by,
      assigned_to,
      previous_assigned_to,
      remarks,
      assigned_at;
  `;

  const values = [
    lead_id,
    assigned_by,
    assigned_to,
    previous_assigned_to,
    remarks,
  ];

  const { rows } = await client.query(query, values);

  return rows[0];
};

/**
 * =====================================================
 * Get Assignment History By Lead
 * =====================================================
 */
export const getLeadAssignmentsRepository = async (
  leadId,
  page = 1,
  limit = 20
) => {

  const offset = (page - 1) * limit;

  const query = `
    SELECT

      la.id,

      la.lead_id,

      la.assigned_at,

      la.remarks,

      previousEmployee.employee_code
        AS previous_employee_code,

      previousEmployee.full_name
        AS previous_counsellor,

      currentEmployee.employee_code
        AS assigned_employee_code,

      currentEmployee.full_name
        AS assigned_counsellor,

      assignedEmployee.full_name
        AS assigned_by

    FROM lead_assignments la

    LEFT JOIN employees previousEmployee
      ON previousEmployee.id = la.previous_assigned_to

    LEFT JOIN employees currentEmployee
      ON currentEmployee.id = la.assigned_to

    LEFT JOIN employees assignedEmployee
      ON assignedEmployee.id = la.assigned_by

    WHERE la.lead_id = $1

    ORDER BY la.assigned_at DESC

    LIMIT $2
    OFFSET $3;
  `;

  const values = [
    leadId,
    limit,
    offset,
  ];

  const { rows } = await pool.query(query, values);

  return rows;
};
/**
 * =====================================================
 * Get Total Assignment Count
 * =====================================================
 */
export const getAssignmentCountRepository = async (
  leadId
) => {

  const query = `
    SELECT
      COUNT(id) AS total
    FROM lead_assignments
    WHERE lead_id = $1;
  `;

  const { rows } = await pool.query(
    query,
    [leadId]
  );

  return Number(rows[0].total);
};

/**
 * =====================================================
 * Get Latest Assignment
 * =====================================================
 */
export const getLatestAssignmentRepository = async (
  leadId
) => {

  const query = `
    SELECT

      la.id,

      la.lead_id,

      la.assigned_by,

      la.assigned_to,

      la.previous_assigned_to,

      la.remarks,

      la.assigned_at,

      e.employee_code,

      u.full_name AS counsellor_name

      e.full_name AS counsellor_name

    FROM lead_assignments la

    LEFT JOIN employees e
      ON la.assigned_to = e.id

    
    WHERE la.lead_id = $1

    ORDER BY la.id DESC

    LIMIT 1;
  `;

  const { rows } = await pool.query(
    query,
    [leadId]
  );

  return rows[0];

};

/**
 * =====================================================
 * Get Assignment By ID
 * =====================================================
 */
export const getAssignmentByIdRepository = async (
  id
) => {

  const query = `
    SELECT

    la.*,

    currentEmployee.full_name
      AS assigned_counsellor,

    previousEmployee.full_name
      AS previous_counsellor,

    assignedEmployee.full_name
      AS assigned_by_name

FROM lead_assignments la

LEFT JOIN employees currentEmployee
    ON la.assigned_to = currentEmployee.id

LEFT JOIN employees previousEmployee
    ON la.previous_assigned_to = previousEmployee.id

LEFT JOIN employees assignedEmployee
    ON la.assigned_by = assignedEmployee.id

WHERE la.id = $1;
  `;

  const { rows } = await pool.query(
    query,
    [id]
  );

  return rows[0];

};

/**
 * =====================================================
 * Check Assignment Exists
 * =====================================================
 */
export const assignmentExistsRepository = async (
  leadId,
  employeeId
) => {

  const query = `
    SELECT

      id

    FROM lead_assignments

    WHERE

      lead_id = $1

      AND assigned_to = $2

    ORDER BY id DESC

    LIMIT 1;
  `;

  const { rows } = await pool.query(
    query,
    [
      leadId,
      employeeId,
    ]
  );

  return rows[0];

};

/**
 * =====================================================
 * Get Assignments By Counsellor
 * =====================================================
 */
export const getAssignmentsByCounsellorRepository =
async (
  employeeId,
  page = 1,
  limit = 20
) => {

  const offset =
    (page - 1) * limit;

  const query = `
    SELECT

      la.id,

      la.assigned_at,

      la.remarks,

      l.id
        AS lead_id,

      l.lead_code,

      l.full_name,

      l.phone,

      l.status,

      l.priority

    FROM lead_assignments la

    INNER JOIN leads l
      ON la.lead_id = l.id

    WHERE

      la.assigned_to = $1

    ORDER BY la.id DESC

    LIMIT $2

    OFFSET $3;
  `;

  const values = [
    employeeId,
    limit,
    offset,
  ];

  const { rows } =
    await pool.query(
      query,
      values
    );

  return rows;

};

/**
 * =====================================================
 * Soft Delete Assignment
 * =====================================================
 */
export const deleteAssignmentRepository = async (
  id
) => {

  const query = `
    DELETE FROM lead_assignments
    WHERE id = $1
    RETURNING
      id,
      lead_id,
      assigned_to,
      assigned_by,
      assigned_at;
  `;

  const { rows } = await pool.query(
    query,
    [id]
  );

  return rows[0];

};