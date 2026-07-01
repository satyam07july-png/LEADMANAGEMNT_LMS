import pool from "../config/db.js";

/**
 * =====================================================
 * Create Lead
 * =====================================================
 */
export const createLeadRepository = async (
  client,
  leadData
) => {
  const {
    lead_code,
    full_name,
    phone,
    email,
    course_id,
    source,
    status,
    priority,
    assigned_to,
    remarks,
    next_followup_date,
    last_contacted_at,
    created_by,
  } = leadData;

  const query = `
    INSERT INTO leads (
      lead_code,
      full_name,
      phone,
      email,
      course_id,
      source,
      status,
      priority,
      assigned_to,
      remarks,
      next_followup_date,
      last_contacted_at,
      created_by
    )
    VALUES (
      $1,$2,$3,$4,$5,
      $6,$7,$8,$9,$10,
      $11,$12,$13
    )
    RETURNING *;
  `;

  const values = [
    lead_code,
    full_name,
    phone,
    email,
    course_id,
    source,
    status,
    priority,
    assigned_to,
    remarks,
    next_followup_date,
    last_contacted_at,
    created_by,
  ];

  const result = await client.query(query, values);

  return result.rows[0];
};

/**
 * =====================================================
 * Find Lead By ID
 * =====================================================
 */
export const getLeadByIdRepository = async (id) => {
  const query = `
    SELECT

      l.*,

      c.course_name,

      e.employee_code,

      u.full_name AS counsellor_name

    FROM leads l

    LEFT JOIN courses c
      ON l.course_id = c.id

    LEFT JOIN employees e
      ON l.assigned_to = e.id

    LEFT JOIN users u
      ON e.user_id = u.id

    WHERE
      l.id = $1
      AND l.is_deleted = FALSE;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

/**
 * =====================================================
 * Find Lead By Phone
 * =====================================================
 */
export const findLeadByPhoneRepository = async (
  phone
) => {
  const query = `
    SELECT *
    FROM leads
    WHERE phone = $1
      AND is_deleted = FALSE;
  `;

  const result = await pool.query(query, [phone]);

  return result.rows[0];
};

/**
 * =====================================================
 * Find Lead By Email
 * =====================================================
 */
export const findLeadByEmailRepository = async (
  email
) => {
  const query = `
    SELECT *
    FROM leads
    WHERE email = $1
      AND is_deleted = FALSE;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

/**
 * =====================================================
 * Get Last Lead
 * =====================================================
 */
export const getLastLeadRepository = async () => {
  const query = `
    SELECT
      lead_code
    FROM leads
    ORDER BY id DESC
    LIMIT 1;
  `;

  const result = await pool.query(query);

  return result.rows[0];
};

/**
 * =====================================================
 * Check Lead Exists
 * =====================================================
 */
export const leadExistsRepository = async (
  id
) => {
  const query = `
    SELECT
      EXISTS(
        SELECT 1
        FROM leads
        WHERE
          id = $1
          AND is_deleted = FALSE
      ) AS exists;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0].exists;
};

/**
 * =====================================================
 * Get Lead Basic Details
 * =====================================================
 */
export const getLeadBasicRepository = async (
  id
) => {
  const query = `
    SELECT
      id,
      lead_code,
      full_name,
      phone,
      email,
      status,
      priority,
      assigned_to
    FROM leads
    WHERE
      id = $1
      AND is_deleted = FALSE;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

/**
 * =====================================================
 * Get All Leads
 * Search + Filter + Pagination + Sorting
 * =====================================================
 */
export const getAllLeadsRepository = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  priority,
  source,
  assigned_to,
  course_id,
  sortBy = "created_at",
  sortOrder = "DESC",
}) => {

  const offset = (page - 1) * limit;

  const values = [];
  let index = 1;

  let query = `
    SELECT

      l.id,
      l.lead_code,
      l.full_name,
      l.phone,
      l.email,
      l.source,
      l.status,
      l.priority,
      l.remarks,
      l.next_followup_date,
      l.last_contacted_at,
      l.created_at,

      c.id AS course_id,
      c.course_name,

      e.id AS employee_id,
      e.employee_code,

      u.full_name AS counsellor_name

    FROM leads l

    LEFT JOIN courses c
      ON l.course_id = c.id

    LEFT JOIN employees e
      ON l.assigned_to = e.id

    LEFT JOIN users u
      ON e.user_id = u.id

    WHERE l.is_deleted = FALSE
  `;

  /**
   * ------------------------------
   * Global Search
   * ------------------------------
   */
  if (search) {

    query += `
      AND (
        l.lead_code ILIKE $${index}
        OR l.full_name ILIKE $${index}
        OR l.phone ILIKE $${index}
        OR l.email ILIKE $${index}
      )
    `;

    values.push(`%${search}%`);
    index++;
  }

  /**
   * ------------------------------
   * Status Filter
   * ------------------------------
   */
  if (status) {

    query += `
      AND l.status = $${index}
    `;

    values.push(status);
    index++;
  }

  /**
   * ------------------------------
   * Priority Filter
   * ------------------------------
   */
  if (priority) {

    query += `
      AND l.priority = $${index}
    `;

    values.push(priority);
    index++;
  }

  /**
   * ------------------------------
   * Source Filter
   * ------------------------------
   */
  if (source) {

    query += `
      AND l.source = $${index}
    `;

    values.push(source);
    index++;
  }

  /**
   * ------------------------------
   * Counsellor Filter
   * ------------------------------
   */
  if (assigned_to) {

    query += `
      AND l.assigned_to = $${index}
    `;

    values.push(assigned_to);
    index++;
  }

  /**
   * ------------------------------
   * Course Filter
   * ------------------------------
   */
  if (course_id) {

    query += `
      AND l.course_id = $${index}
    `;

    values.push(course_id);
    index++;
  }

  /**
   * ------------------------------
   * Count Query
   * ------------------------------
   */

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM (${query}) AS total_leads;
  `;

  const countResult = await pool.query(
    countQuery,
    values
  );

  /**
   * ------------------------------
   * Sorting
   * ------------------------------
   */

  const allowedSortFields = [
    "created_at",
    "full_name",
    "status",
    "priority",
    "lead_code",
  ];

  const finalSortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : "created_at";

  const finalSortOrder =
    sortOrder.toUpperCase() === "ASC"
      ? "ASC"
      : "DESC";

  query += `
    ORDER BY
      l.${finalSortField}
      ${finalSortOrder}
  `;

  /**
   * ------------------------------
   * Pagination
   * ------------------------------
   */

  query += `
    LIMIT $${index}
    OFFSET $${index + 1}
  `;

  values.push(limit);
  values.push(offset);

  const result = await pool.query(
    query,
    values
  );

  return {

    leads: result.rows,

    pagination: {

      total: Number(
        countResult.rows[0].total
      ),

      page: Number(page),

      limit: Number(limit),

      totalPages: Math.ceil(
        Number(countResult.rows[0].total) /
        Number(limit)
      ),

      hasNextPage:
        Number(page) <
        Math.ceil(
          Number(countResult.rows[0].total) /
          Number(limit)
        ),

      hasPreviousPage:
        Number(page) > 1,

    },

  };

};

/**
 * =====================================================
 * Update Lead
 * =====================================================
 */
export const updateLeadRepository = async (
  id,
  leadData
) => {

  const {
    full_name,
    phone,
    email,
    course_id,
    source,
    status,
    priority,
    assigned_to,
    remarks,
    next_followup_date,
    last_contacted_at,
  } = leadData;

  const query = `
    UPDATE leads
    SET
      full_name = $1,
      phone = $2,
      email = $3,
      course_id = $4,
      source = $5,
      status = $6,
      priority = $7,
      assigned_to = $8,
      remarks = $9,
      next_followup_date = $10,
      last_contacted_at = $11,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $12
      AND is_deleted = FALSE
    RETURNING *;
  `;

  const values = [
    full_name,
    phone,
    email,
    course_id,
    source,
    status,
    priority,
    assigned_to,
    remarks,
    next_followup_date,
    last_contacted_at,
    id,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

/**
 * =====================================================
 * Soft Delete Lead
 * =====================================================
 */
export const softDeleteLeadRepository = async (
  id
) => {

  const query = `
    UPDATE leads
    SET
      is_deleted = TRUE,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $1
      AND is_deleted = FALSE
    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [id]
  );

  return result.rows[0];
};

/**
 * =====================================================
 * Update Lead Status
 * =====================================================
 */
export const updateLeadStatusRepository = async (
  id,
  status
) => {

  const query = `
    UPDATE leads
    SET
      status = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $2
      AND is_deleted = FALSE
    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [
      status,
      id,
    ]
  );

  return result.rows[0];
};

/**
 * =====================================================
 * Assign Lead
 * =====================================================
 */
export const assignLeadRepository = async (
  id,
  assigned_to
) => {

  const query = `
    UPDATE leads
    SET
      assigned_to = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $2
      AND is_deleted = FALSE
    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [
      assigned_to,
      id,
    ]
  );

  return result.rows[0];
};

/**
 * =====================================================
 * Update Lead Priority
 * =====================================================
 */
export const updateLeadPriorityRepository = async (
  id,
  priority
) => {

  const query = `
    UPDATE leads
    SET
      priority = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $2
      AND is_deleted = FALSE
    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [
      priority,
      id,
    ]
  );

  return result.rows[0];
};

/**
 * =====================================================
 * Update Lead Follow-up
 * =====================================================
 */
export const updateLeadFollowupRepository = async (
  id,
  next_followup_date,
  last_contacted_at
) => {

  const query = `
    UPDATE leads
    SET
      next_followup_date = $1,
      last_contacted_at = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $3
      AND is_deleted = FALSE
    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [
      next_followup_date,
      last_contacted_at,
      id,
    ]
  );

  return result.rows[0];
};

/**
 * =====================================================
 * Dashboard Statistics
 * =====================================================
 */
export const getLeadDashboardRepository = async () => {

  const query = `
    SELECT

      COUNT(*) FILTER (
        WHERE is_deleted = FALSE
      ) AS total_leads,

      COUNT(*) FILTER (
        WHERE status = 'new'
          AND is_deleted = FALSE
      ) AS new_leads,

      COUNT(*) FILTER (
        WHERE status = 'contacted'
          AND is_deleted = FALSE
      ) AS contacted_leads,

      COUNT(*) FILTER (
        WHERE status = 'follow_up'
          AND is_deleted = FALSE
      ) AS followup_leads,

      COUNT(*) FILTER (
        WHERE status = 'interested'
          AND is_deleted = FALSE
      ) AS interested_leads,

      COUNT(*) FILTER (
        WHERE status = 'admission_done'
          AND is_deleted = FALSE
      ) AS admission_done,

      COUNT(*) FILTER (
        WHERE status = 'lost'
          AND is_deleted = FALSE
      ) AS lost_leads

    FROM leads;
  `;

  const result = await pool.query(query);

  return result.rows[0];

};

/**
 * =====================================================
 * Today's Follow-ups
 * =====================================================
 */
export const getTodayFollowupsRepository = async () => {

  const query = `
    SELECT

      l.id,
      l.lead_code,
      l.full_name,
      l.phone,
      l.priority,
      l.next_followup_date,

      e.employee_code,

      u.full_name
      AS counsellor_name

    FROM leads l

    LEFT JOIN employees e
      ON l.assigned_to = e.id

    LEFT JOIN users u
      ON e.user_id = u.id

    WHERE

      DATE(
        l.next_followup_date
      ) = CURRENT_DATE

      AND l.is_deleted = FALSE

    ORDER BY

      l.next_followup_date ASC;
  `;

  const result = await pool.query(query);

  return result.rows;

};

/**
 * =====================================================
 * Recent Leads
 * =====================================================
 */
export const getRecentLeadsRepository = async (
  limit = 10
) => {

  const query = `
    SELECT *

    FROM leads

    WHERE is_deleted = FALSE

    ORDER BY created_at DESC

    LIMIT $1;
  `;

  const result = await pool.query(
    query,
    [limit]
  );

  return result.rows;

};

/**
 * =====================================================
 * Lead Status Analytics
 * =====================================================
 */
export const getLeadStatusAnalyticsRepository =
async () => {

  const query = `
    SELECT

      status,

      COUNT(*) AS total

    FROM leads

    WHERE is_deleted = FALSE

    GROUP BY status

    ORDER BY total DESC;
  `;

  const result = await pool.query(query);

  return result.rows;

};

/**
 * =====================================================
 * Lead Source Analytics
 * =====================================================
 */
export const getLeadSourceAnalyticsRepository =
async () => {

  const query = `
    SELECT

      source,

      COUNT(*) AS total

    FROM leads

    WHERE is_deleted = FALSE

    GROUP BY source

    ORDER BY total DESC;
  `;

  const result = await pool.query(query);

  return result.rows;

};

/**
 * =====================================================
 * Priority Analytics
 * =====================================================
 */
export const getLeadPriorityAnalyticsRepository =
async () => {

  const query = `
    SELECT

      priority,

      COUNT(*) AS total

    FROM leads

    WHERE is_deleted = FALSE

    GROUP BY priority

    ORDER BY total DESC;
  `;

  const result = await pool.query(query);

  return result.rows;

};

/**
 * =====================================================
 * Counsellor Performance
 * =====================================================
 */
export const getCounsellorPerformanceRepository =
async () => {

  const query = `
    SELECT

      e.id,

      e.employee_code,

      u.full_name,

      COUNT(l.id) AS total_leads

    FROM employees e

    INNER JOIN users u

      ON e.user_id = u.id

    LEFT JOIN leads l

      ON l.assigned_to = e.id

      AND l.is_deleted = FALSE

    GROUP BY

      e.id,
      e.employee_code,
      u.full_name

    ORDER BY total_leads DESC;
  `;

  const result = await pool.query(query);

  return result.rows;

};