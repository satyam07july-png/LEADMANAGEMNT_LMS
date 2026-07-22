import pool from "../config/db.js";

/* ===========================
   CREATE USER
=========================== */

export const createUserRepository = async (
    client,
    user
) => {

    const query = `
        INSERT INTO users (

            full_name,
            email,
            password,
            role

        )

        VALUES ($1,$2,$3,$4)

        RETURNING *;
    `;

    const values = [

        user.full_name,
        user.email,
        user.password,
        user.role

    ];

    const result =
    await client.query(query, values);

    return result.rows[0];

};

/* ===========================
   FIND USER BY EMAIL
=========================== */

export const findUserByEmailRepository = async (
    email
) => {

    const query = `

        SELECT *

        FROM users

        WHERE email = $1

        AND is_deleted = FALSE;

    `;

    const result =
    await pool.query(query,[email]);

    return result.rows[0];

};

/* ===========================
   FIND USER BY ID
=========================== */

export const findUserByIdRepository = async (
    id
) => {

    const query = `

        SELECT *

        FROM users

        WHERE id = $1

        AND is_deleted = FALSE;

    `;

    const result =
    await pool.query(query,[id]);

    return result.rows[0];

};

export const updateUserRepository = async (
    client,
    id,
    user
) => {

    const query = `
        UPDATE users
        SET
            full_name = $1,
            role = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        AND is_deleted = FALSE
        RETURNING *;
    `;

    const values = [
        user.full_name,
        user.role,
        id
    ];

    const result = await client.query(query, values);

    return result.rows[0];

};

export const softDeleteUserRepository = async (
    client,
    id
) => {

    const query = `
        UPDATE users
        SET
            is_deleted = TRUE,
            is_active = FALSE,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        AND is_deleted = FALSE
        RETURNING *;
    `;

    const result = await client.query(query,[id]);

    return result.rows[0];

};

export const restoreUserRepository = async (
    client,
    id
) => {

    const query = `
        UPDATE users
        SET
            is_deleted = FALSE,
            is_active = TRUE,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        AND is_deleted = TRUE
        RETURNING *;
    `;

    const result = await client.query(query,[id]);

    return result.rows[0];

};

export const updateLastLoginRepository = async (
    client,
    id
) => {

    const query = `
        UPDATE users
        SET
            last_login = CURRENT_TIMESTAMP
        WHERE id = $1;
    `;

    await client.query(query,[id]);

};

