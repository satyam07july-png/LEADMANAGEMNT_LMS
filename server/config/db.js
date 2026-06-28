import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

console.log("DB Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ? "✅ Loaded" : "❌ Missing",
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch((err) => console.error("❌ PostgreSQL Error:", err.message));

export default pool;