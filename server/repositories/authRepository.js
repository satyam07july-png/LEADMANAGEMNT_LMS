import pool from "../config/db.js";

/**
 * =====================================================
 * Module : Auth Repository
 * Project : IEM LMS
 * =====================================================
 */

/**
 * Create User
 */
export const createUserRepository = async (client, userData) => {
  const {
    full_name,
    email,
    password,
    role,
  } = userData;

  const query = `
    INSERT INTO users (
      full_name,
      email,
      password,
      role
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    full_name,
    email,
    password,
    role,
  ];

  const result = await client.query(query, values);

  return result.rows[0];
};

/**
 * Find User By Email
 */
export const findUserByEmailRepository = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

/**
 * Find User By ID
 */
export const findUserByIdRepository = async (id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};