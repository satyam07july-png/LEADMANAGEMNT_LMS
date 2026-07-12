import pool from "../config/db.js";

/**
 * =====================================================
 * Generate Next Lead Code
 * =====================================================
 */
export const getNextLeadCodeRepository = async (client) => {
  const result = await client.query(`
    SELECT nextval('lead_code_seq') AS sequence;
  `);

  return result.rows[0].sequence;
};

/**
 * =====================================================
 * Create Lead
 * =====================================================
 */
export const createLeadRepository = async (
  client,
  lead
) => {

  const query = `
    INSERT INTO leads (

      lead_code,
      full_name,
      email,
      mobile,
      campaign_id,
      assigned_to,
      source,
      status,
      priority,
      remarks,
      next_followup,
      created_by

    )

    VALUES (

      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12

    )

    RETURNING *;
  `;

  const values = [

    lead.lead_code,
    lead.full_name,
    lead.email,
    lead.mobile,
    lead.campaign_id,
    lead.assigned_to,
    lead.source,
    lead.status,
    lead.priority,
    lead.remarks,
    lead.next_followup,
    lead.created_by,

  ];

  const result =
    await client.query(query, values);

  return result.rows[0];

};

/**
 * =====================================================
 * Find Lead By ID
 * =====================================================
 */
export const findLeadByIdRepository = async (
  id
) => {

  const result = await pool.query(

    `
      SELECT *
      FROM leads
      WHERE id = $1
      AND is_deleted = FALSE;
    `,

    [id]

  );

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

  const result = await pool.query(

    `
      SELECT *
      FROM leads
      WHERE email = $1
      AND is_deleted = FALSE;
    `,

    [email]

  );

  return result.rows[0];

};

/**
 * =====================================================
 * Find Lead By Mobile
 * =====================================================
 */
export const findLeadByMobileRepository = async (
  mobile
) => {

  const result = await pool.query(

    `
      SELECT *
      FROM leads
      WHERE mobile = $1
      AND is_deleted = FALSE;
    `,

    [mobile]

  );

  return result.rows[0];

};

/**
 * =====================================================
 * Get All Leads
 * Search + Filter + Pagination + Sorting
 * =====================================================
 */
export const getLeadsRepository = async (filters) => {

  const {
    page = 1,
    limit = 10,
    search = "",
    source,
    status,
    priority,
    assigned_to,
    sortBy = "created_at",
    order = "DESC",
  } = filters;

  const values = [];
  let index = 1;

  let whereClause = `
    WHERE l.is_deleted = FALSE
  `;

  // ==========================
  // Search
  // ==========================

  if (search) {

    whereClause += `
      AND (
        l.lead_code ILIKE $${index}
        OR l.full_name ILIKE $${index}
        OR l.email ILIKE $${index}
        OR l.mobile ILIKE $${index}
      )
    `;

    values.push(`%${search}%`);
    index++;

  }

  // ==========================
  // Source Filter
  // ==========================

  if (source) {

    whereClause += `
      AND l.source = $${index}
    `;

    values.push(source);
    index++;

  }

  // ==========================
  // Status Filter
  // ==========================

  if (status) {

    whereClause += `
      AND l.status = $${index}
    `;

    values.push(status);
    index++;

  }

  // ==========================
  // Priority Filter
  // ==========================

  if (priority) {

    whereClause += `
      AND l.priority = $${index}
    `;

    values.push(priority);
    index++;

  }

  // ==========================
  // Assigned Employee Filter
  // ==========================

  if (assigned_to) {

    whereClause += `
      AND l.assigned_to = $${index}
    `;

    values.push(assigned_to);
    index++;

  }

  // ==========================
  // Count Query
  // ==========================

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM leads l
    ${whereClause}
  `;

  const countResult = await pool.query(
    countQuery,
    values
  );

  const totalRecords = Number(
    countResult.rows[0].total
  );

  // ==========================
  // Sorting
  // ==========================

  const allowedSort = [
    "created_at",
    "full_name",
    "lead_code",
    "status",
    "priority",
  ];

  const sortColumn = allowedSort.includes(sortBy)
    ? sortBy
    : "created_at";

  const sortOrder =
    order.toUpperCase() === "ASC"
      ? "ASC"
      : "DESC";

  // ==========================
  // Main Query
  // ==========================

  const query = `
    SELECT
      l.*,
      e.full_name AS assigned_employee,
      cp.campaign_name AS course_name

    FROM leads l

    LEFT JOIN employees e
      ON l.assigned_to = e.id

    LEFT JOIN campaigns cp
      ON l.campaign_id = cp.id

    ${whereClause}

    ORDER BY l.${sortColumn} ${sortOrder}

    LIMIT $${index}

    OFFSET $${index + 1}
  `;

  values.push(Number(limit));

  values.push(
    (Number(page) - 1) * Number(limit)
  );

  const result = await pool.query(
    query,
    values
  );

  return {

    leads: result.rows,

    pagination: {

      page: Number(page),

      limit: Number(limit),

      totalRecords,

      totalPages:
        Math.ceil(totalRecords / Number(limit)) || 1,

    },

  };

};

/**
 * =====================================================
 * Update Lead
 * =====================================================
 */

export const updateLeadRepository = async (
  client,
  id,
  lead
) => {
  try {

    const query = `
      UPDATE leads
      SET
        full_name = $1,
        email = $2,
        mobile = $3,
        campaign_id = $4,
        assigned_to = $5,
        source = $6,
        status = $7,
        priority = $8,
        remarks = $9,
        next_followup = $10,
        updated_by = $11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *;
    `;

    const values = [
      lead.full_name,
      lead.email,
      lead.mobile,
      lead.campaign_id,
      lead.assigned_to,
      lead.source,
      lead.status,
      lead.priority,
      lead.remarks,
      lead.next_followup,
      lead.updated_by,
      id,
    ];

    console.log(values);

    const result = await client.query(query, values);

    return result.rows[0];

  } catch (err) {

    console.error("UPDATE LEAD ERROR:", err);

    throw err;

  }
};

/**
 * =====================================================
 * Soft Delete Lead
 * =====================================================
 */

export const deleteLeadRepository = async (
  client,
  id,
  updatedBy
) => {

  const query = `
    UPDATE leads

    SET

      is_deleted = TRUE,

      updated_by = $1,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $2

    RETURNING *;
  `;

  const result =
    await client.query(query, [

      updatedBy,

      id,

    ]);

  return result.rows[0];

};

/**
 * =====================================================
 * Restore Lead
 * =====================================================
 */

export const restoreLeadRepository = async (
  client,
  id,
  updatedBy
) => {

  const query = `
    UPDATE leads

    SET

      is_deleted = FALSE,

      updated_by = $1,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $2

    RETURNING *;
  `;

  const result =
    await client.query(query, [

      updatedBy,

      id,

    ]);

  return result.rows[0];

};

/**
 * =====================================================
 * Assign Lead
 * =====================================================
 */

export const assignLeadRepository = async (
  client,
  id,
  employeeId,
  updatedBy
) => {

  const query = `
    UPDATE leads

    SET

      assigned_to = $1,

      updated_by = $2,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $3

    RETURNING *;
  `;

  const result =
    await client.query(query, [

      employeeId,

      updatedBy,

      id,

    ]);

  return result.rows[0];

};

/**
 * =====================================================
 * Update Lead Status
 * =====================================================
 */

export const updateLeadStatusRepository = async (
  client,
  id,
  status,
  updatedBy
) => {

  const query = `
    UPDATE leads

    SET

      status = $1,

      updated_by = $2,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $3

    RETURNING *;
  `;

  const result =
    await client.query(query, [

      status,

      updatedBy,

      id,

    ]);

  return result.rows[0];

};

/**
 * =====================================================
 * Lead Statistics
 * =====================================================
 */

export const getLeadStatisticsRepository = async () => {

  const query = `
    SELECT

      COUNT(*) FILTER (
        WHERE is_deleted = FALSE
      ) AS total_leads,

      COUNT(*) FILTER (
        WHERE status = 'NEW'
        AND is_deleted = FALSE
      ) AS new_leads,

      COUNT(*) FILTER (
        WHERE status = 'CONTACTED'
        AND is_deleted = FALSE
      ) AS contacted_leads,

      COUNT(*) FILTER (
        WHERE status = 'FOLLOW_UP'
        AND is_deleted = FALSE
      ) AS followup_leads,

      COUNT(*) FILTER (
        WHERE status = 'QUALIFIED'
        AND is_deleted = FALSE
      ) AS qualified_leads,

      COUNT(*) FILTER (
        WHERE status = 'ADMISSION_DONE'
        AND is_deleted = FALSE
      ) AS admission_done,

      COUNT(*) FILTER (
        WHERE status = 'LOST'
        AND is_deleted = FALSE
      ) AS lost_leads

    FROM leads;
  `;

  const result = await pool.query(query);

  return result.rows[0];

};

/**
 * =====================================================
 * Add Lead Note
 * =====================================================
 */

export const addLeadNoteRepository = async (
  client,
  leadId,
  note,
  userId
) => {

  const query = `
    INSERT INTO lead_notes (

      lead_id,
      note,
      created_by

    )

    VALUES (

      $1,$2,$3

    )

    RETURNING *;
  `;

  const result = await client.query(

    query,

    [

      leadId,

      note,

      userId,

    ]

  );

  return result.rows[0];

};

/**
 * =====================================================
 * Get Lead Notes
 * =====================================================
 */

export const getLeadNotesRepository = async (
  leadId
) => {

  const query = `
    SELECT

      ln.*,

      e.full_name AS created_by_name

    FROM lead_notes ln

    LEFT JOIN employees e

      ON ln.created_by = e.id

    WHERE ln.lead_id = $1

    ORDER BY ln.created_at DESC;
  `;

  const result =
    await pool.query(

      query,

      [

        leadId,

      ]

    );

  return result.rows;

};

/**
 * =====================================================
 * Add Lead Timeline
 * =====================================================
 */

export const addLeadTimelineRepository = async (
  client,
  leadId,
  action,
  remarks,
  userId
) => {

  const query = `
    INSERT INTO lead_timeline (

      lead_id,
      action,
      remarks,
      created_by

    )

    VALUES (

      $1,$2,$3,$4

    )

    RETURNING *;
  `;

  const result = await client.query(

    query,

    [

      leadId,

      action,

      remarks,

      userId,

    ]

  );

  return result.rows[0];

};

/**
 * =====================================================
 * Get Lead Timeline
 * =====================================================
 */

export const getLeadTimelineRepository = async (
  leadId
) => {

  const query = `
    SELECT

      lt.*,

      e.full_name AS created_by_name

    FROM lead_timeline lt

    LEFT JOIN employees e

      ON lt.created_by = e.id

    WHERE lt.lead_id = $1

    ORDER BY lt.created_at DESC;
  `;

  const result =
    await pool.query(

      query,

      [

        leadId,

      ]

    );

  return result.rows;

};