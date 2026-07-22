import pool from "../config/db.js";

/*
=========================================
Create Lead Activity
=========================================
*/

export const createLeadActivityRepository = async (

    client,

    {

        lead_id,

        activity,

        description,

        performed_by,

    }

) => {

    const query = `

        INSERT INTO lead_activity_logs (

            lead_id,

            activity,

            description,

            performed_by

        )

        VALUES (

            $1,

            $2,

            $3,

            $4

        )

        RETURNING *;

    `;

    const { rows } = await client.query(

        query,

        [

            lead_id,

            activity,

            description,

            performed_by,

        ]

    );

    return rows[0];

};