import pool from "../config/db.js";

/**
 * =====================================================
 * Create Follow-up
 * =====================================================
 */
export const createFollowupRepository = async (
  client,
  followup
) => {

  const query = `
    INSERT INTO lead_followups (

      lead_id,
      employee_id,
      followup_type,
      status,
      outcome,
      priority,
      next_followup_at,
      remarks,
      created_by

    )

    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9
    )

    RETURNING *;
  `;

  const values = [

    followup.lead_id,

    followup.employee_id,

    followup.followup_type,

    followup.status,

    followup.outcome,

    followup.priority,

    followup.next_followup_at,

    followup.remarks,

    followup.created_by,

  ];

  const { rows } =
    await client.query(query, values);

  return rows[0];

};

export const findFollowupByIdRepository =
async (id) => {

  const query = `
    SELECT *

    FROM lead_followups

    WHERE

      id = $1

      AND is_deleted = FALSE;
  `;

  const { rows } =
    await pool.query(query,[id]);

  return rows[0];

};

export const getLeadFollowupsRepository =
async (

  leadId,

  page = 1,

  limit = 20

) => {

  const offset =
    (page-1)*limit;

  const query = `

    SELECT

      lf.*,

      e.employee_code,

      e.full_name

    FROM lead_followups lf

    INNER JOIN employees e

      ON lf.employee_id = e.id

    WHERE

      lf.lead_id = $1

      AND lf.is_deleted = FALSE

    ORDER BY

      lf.created_at DESC

    LIMIT $2

    OFFSET $3;

  `;

  const values = [

    leadId,

    limit,

    offset

  ];

  const { rows } =
    await pool.query(query,values);

  return rows;

};

export const getPendingFollowupsRepository =
async (

  employeeId

) => {

  const query = `

    SELECT *

    FROM lead_followups

    WHERE

      employee_id = $1

      AND status='PENDING'

      AND is_deleted = FALSE

    ORDER BY next_followup_at ASC;

  `;

  const { rows } =
    await pool.query(
      query,
      [employeeId]
    );

  return rows;

};

export const getTodayFollowupsRepository =
async (

  employeeId

) => {

  const query = `

    SELECT *

    FROM lead_followups

    WHERE

      employee_id = $1

      AND DATE(next_followup_at)=CURRENT_DATE

      AND is_deleted = FALSE

    ORDER BY next_followup_at ASC;

  `;

  const { rows } =
    await pool.query(
      query,
      [employeeId]
    );

  return rows;

};

export const getOverdueFollowupsRepository =
async (

  employeeId

) => {

  const query = `

    SELECT *

    FROM lead_followups

    WHERE

      employee_id = $1

      AND status='PENDING'

      AND next_followup_at < NOW()

      AND is_deleted = FALSE

    ORDER BY next_followup_at ASC;

  `;

  const { rows } =
    await pool.query(
      query,
      [employeeId]
    );

  return rows;

};

export const deleteFollowupRepository =
async (

  client,

  id,

  updatedBy

) => {

  const query = `

    UPDATE lead_followups

    SET

      is_deleted = TRUE,

      updated_by = $1,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $2

    RETURNING *;

  `;

  const { rows } =
    await client.query(
      query,
      [

        updatedBy,

        id

      ]
    );

  return rows[0];

};

export const updateFollowupRepository = async (
    client,
    id,
    followup
) => {

    const query = `
        UPDATE lead_followups

        SET

            status = $1,

            outcome = $2,

            priority = $3,

            next_followup_at = $4,

            remarks = $5,

            updated_by = $6,

            updated_at = CURRENT_TIMESTAMP

        WHERE

            id = $7

            AND is_deleted = FALSE

        RETURNING *;
    `;

    const values = [

        followup.status,
        followup.outcome,
        followup.priority,
        followup.next_followup_at,
        followup.remarks,
        followup.updated_by,
        id,

    ];

    const { rows } =
        await client.query(query, values);

    return rows[0];

};

export const completeFollowupRepository = async (
  client,
  id,
  completedBy,
  outcome,
  remarks
) => {

  const query = `
    UPDATE lead_followups
    SET
      status = 'COMPLETED',
      outcome = $1,
      remarks = $2,
      updated_by = $3,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $4
      AND is_deleted = FALSE
    RETURNING *;
  `;

  const { rows } = await client.query(query, [
    outcome,
    remarks,
    completedBy,
    id,
  ]);

  return rows[0];

};

export const rescheduleFollowupRepository = async (
  client,
  id,
  nextFollowupAt,
  remarks,
  updatedBy
) => {

  const query = `
    UPDATE lead_followups
    SET

      status = 'RESCHEDULED',

      next_followup_at = $1,

      remarks = $2,

      updated_by = $3,

      updated_at = CURRENT_TIMESTAMP

    WHERE

      id = $4

      AND is_deleted = FALSE

    RETURNING *;
  `;

  const { rows } = await client.query(query, [

    nextFollowupAt,

    remarks,

    updatedBy,

    id,

  ]);

  return rows[0];

};

export const getCompletedFollowupsRepository = async (
  employeeId,
  page = 1,
  limit = 20
) => {

  const offset = (page - 1) * limit;

  const query = `
    SELECT
      lf.*,
      l.lead_code,
      l.full_name AS lead_name,
      e.full_name AS counsellor_name
    FROM lead_followups lf

    INNER JOIN leads l
      ON l.id = lf.lead_id

    INNER JOIN employees e
      ON e.id = lf.employee_id

    WHERE

      lf.employee_id = $1

      AND lf.status = 'COMPLETED'

      AND lf.is_deleted = FALSE

    ORDER BY lf.updated_at DESC

    LIMIT $2 OFFSET $3;
  `;

  const { rows } =
    await pool.query(query, [
      employeeId,
      limit,
      offset,
    ]);

  return rows;

};

export const getUpcomingFollowupsRepository = async (
  employeeId
) => {

  const query = `
    SELECT *

    FROM lead_followups

    WHERE

      employee_id = $1

      AND next_followup_at > NOW()

      AND status='PENDING'

      AND is_deleted = FALSE

    ORDER BY next_followup_at ASC;
  `;

  const { rows } =
    await pool.query(query, [
      employeeId
    ]);

  return rows;

};


export const getMissedFollowupsRepository = async (
  employeeId
) => {

  const query = `
    SELECT *

    FROM lead_followups

    WHERE

      employee_id = $1

      AND next_followup_at < NOW()

      AND status='PENDING'

      AND is_deleted = FALSE

    ORDER BY next_followup_at ASC;
  `;

  const { rows } =
    await pool.query(query, [
      employeeId
    ]);

  return rows;

};

export const getEmployeeFollowupsRepository = async (
  employeeId
) => {

  const query = `
    SELECT

      lf.*,

      l.lead_code,

      l.full_name AS lead_name

    FROM lead_followups lf

    INNER JOIN leads l

      ON l.id = lf.lead_id

    WHERE

      lf.employee_id = $1

      AND lf.is_deleted = FALSE

    ORDER BY lf.created_at DESC;
  `;

  const { rows } =
    await pool.query(query, [
      employeeId
    ]);

  return rows;

};

export const getFollowupStatisticsRepository =
async () => {

  const query = `
    SELECT

      COUNT(*) AS total,

      COUNT(*) FILTER (
        WHERE status='PENDING'
      ) AS pending,

      COUNT(*) FILTER (
        WHERE status='COMPLETED'
      ) AS completed,

      COUNT(*) FILTER (
        WHERE DATE(next_followup_at)=CURRENT_DATE
      ) AS today,

      COUNT(*) FILTER (
        WHERE next_followup_at < NOW()

        AND status='PENDING'
      ) AS overdue

    FROM lead_followups

    WHERE is_deleted = FALSE;
  `;

  const { rows } =
    await pool.query(query);

  return rows[0];

};

