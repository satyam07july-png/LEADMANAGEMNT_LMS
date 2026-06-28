import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Database Connection Test
const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});