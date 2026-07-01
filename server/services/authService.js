import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const registerUser = async (userData) => {
  const { full_name, email, password, role } = userData;

  // Check existing user
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new ApiError(
    409,
    "Email already exists"
);
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert User
  const result = await pool.query(
    `INSERT INTO users(full_name,email,password,role)
     VALUES($1,$2,$3,$4)
     RETURNING id, full_name, email, role`,
    [full_name, email, hashedPassword, role]
  );

  return result.rows[0];
};

export const loginUser = async (email, password) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid Email");
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  return user;
};