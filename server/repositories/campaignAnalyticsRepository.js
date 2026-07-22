import pool from "../config/db.js";

/**
 * =====================================================
 * Campaign Analytics Repository
 * =====================================================
 */

export const getCampaignAnalyticsRepository = async (
    campaignId
) => {

    const campaignQuery = `

        SELECT *

        FROM campaigns

        WHERE id=$1

        AND is_deleted=false

    `;  

    const campaign =
        await pool.query(
            campaignQuery,
            [campaignId]
        );

    if (!campaign.rows.length) {

        return null;

    }

    const overviewQuery = `
    SELECT

        COUNT(*) AS total_leads,

        COUNT(*) FILTER (
            WHERE status = 'NEW'
        ) AS new_leads,

        COUNT(*) FILTER (
            WHERE status = 'PENDING'
        ) AS pending_leads,

        COUNT(*) FILTER (
            WHERE status = 'CONFIRMED'
        ) AS confirmed_leads,

        COUNT(*) FILTER (
            WHERE status = 'REJECTED'
        ) AS rejected_leads

    FROM leads

    WHERE campaign_id = $1
      AND is_deleted = false;
`;


const overviewResult = await pool.query(
    overviewQuery,
    [campaignId]
);

const overview = overviewResult.rows[0];


/* =====================================================
   Monthly Leads
===================================================== */

const monthlyLeadsQuery = `

SELECT

    DATE_TRUNC('month', created_at) AS month_date,

    TO_CHAR(created_at,'Mon YYYY') AS month,

    COUNT(*)::INT AS leads

FROM leads

WHERE campaign_id = $1
AND is_deleted = false

GROUP BY

    DATE_TRUNC('month', created_at),

    TO_CHAR(created_at,'Mon YYYY')

ORDER BY

    month_date ASC;

`;

const monthlyLeadsResult = await pool.query(

    monthlyLeadsQuery,

    [campaignId]

);

const monthlyLeads =
    monthlyLeadsResult.rows;

/* =====================================================
   Recent Leads
===================================================== */

const recentLeadsQuery = `

SELECT

    l.id,

    l.lead_code,

    l.full_name,

    l.mobile,

    l.status,

    l.priority,

    l.created_at,

    e.full_name AS counsellor

FROM leads l

LEFT JOIN employees e

ON e.id = l.assigned_to

WHERE l.campaign_id = $1
AND l.is_deleted = false

ORDER BY l.created_at DESC

LIMIT 10;

`;

const recentLeadsResult = await pool.query(
    recentLeadsQuery,
    [campaignId]
);

const recentLeads = recentLeadsResult.rows;

/* =====================================================
   Employee Performance
===================================================== */

const employeePerformanceQuery = `

SELECT

    e.id,

    e.full_name,

    COUNT(l.id)::INT AS total_assigned,

    COUNT(*) FILTER (
        WHERE l.status='NEW'
    )::INT AS new_leads,

    COUNT(*) FILTER (
        WHERE l.status='PENDING'
    )::INT AS pending_leads,

    COUNT(*) FILTER (
        WHERE l.status='CONFIRMED'
    )::INT AS confirmed_leads,

    COUNT(*) FILTER (
        WHERE l.status='REJECTED'
    )::INT AS rejected_leads,

    ROUND(

        (
            COUNT(*) FILTER (
                WHERE l.status='CONFIRMED'
            )::DECIMAL

            /

            NULLIF(COUNT(l.id),0)

        ) * 100,

        2

    ) AS conversion_rate

FROM employees e

LEFT JOIN leads l

ON l.assigned_to = e.id

AND l.campaign_id = $1

AND l.is_deleted = false

GROUP BY

    e.id,

    e.full_name

ORDER BY

    confirmed_leads DESC,

    total_assigned DESC;

`;

const employeePerformanceResult =
    await pool.query(
        employeePerformanceQuery,
        [campaignId]
    );

const employees =
    employeePerformanceResult.rows;

/* =====================================================
   Weekly Leads
===================================================== */

const weeklyLeadsQuery = `

SELECT

'Week ' ||

EXTRACT(WEEK FROM created_at)

AS week,

COUNT(*)::INT AS leads

FROM leads

WHERE campaign_id=$1

AND is_deleted=false

AND DATE_TRUNC('month',created_at)=DATE_TRUNC('month',CURRENT_DATE)

GROUP BY

EXTRACT(WEEK FROM created_at)

ORDER BY

EXTRACT(WEEK FROM created_at);

`;

const weeklyResult =
await pool.query(

weeklyLeadsQuery,

[campaignId]

);

const weeklyLeads =
weeklyResult.rows;

/* =====================================================
   Region Analytics
===================================================== */

const regionQuery = `

SELECT

preferred_centre,

COUNT(*)::INT AS leads

FROM leads

WHERE campaign_id=$1

AND is_deleted=false

GROUP BY preferred_centre

ORDER BY leads DESC;

`;

const regionResult =
await pool.query(

regionQuery,

[campaignId]

);

const regions =
regionResult.rows;

   return {

    campaign: campaign.rows[0],

    overview,

    monthly_leads: monthlyLeads,


weekly_leads: weeklyLeads,

    regions,

    employees, 

    recent_leads: recentLeads,

};

};

