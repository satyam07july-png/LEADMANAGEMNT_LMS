import dotenv from "dotenv";

dotenv.config();

/**
 * =====================================================
 * Environment Validation
 * Project : IEM Admissions CRM
 * =====================================================
 */

const validateEnv = () => {

  /**
   * -------------------------------------
   * Common Required Variables
   * -------------------------------------
   */

  const required = [
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES_IN",
  ];

  /**
   * -------------------------------------
   * PORT (Optional)
   * -------------------------------------
   */

  if (!process.env.PORT) {
    process.env.PORT = "5000";
  }

  /**
   * -------------------------------------
   * Database Validation
   * -------------------------------------
   *
   * Priority:
   *
   * 1. DATABASE_URL
   * 2. Individual DB Variables
   */

  if (!process.env.DATABASE_URL) {

    required.push(
      "DB_HOST",
      "DB_PORT",
      "DB_USER",
      "DB_PASSWORD",
      "DB_NAME"
    );

  }

  /**
   * -------------------------------------
   * Find Missing Variables
   * -------------------------------------
   */

  const missing = required.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {

    console.error("\n❌ Missing Environment Variables\n");

    missing.forEach((key) => {
      console.error(`   • ${key}`);
    });

    console.error(
      "\nPlease update your .env file.\n"
    );

    process.exit(1);

  }

  console.log(
    "✅ Environment Variables Loaded Successfully"
  );

};

export default validateEnv;