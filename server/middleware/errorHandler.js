import ApiError from "../utils/ApiError.js";

/**
 * =====================================================
 * Global Error Handler
 * Project : IEM Admissions CRM
 * =====================================================
 */

const errorHandler = (
  err,
  req,
  res,
  next
) => {

  let statusCode = err.statusCode || 500;

  let message =
    err.message || "Internal Server Error";

  /**
   * ----------------------------------------
   * PostgreSQL Errors
   * ----------------------------------------
   */

  switch (err.code) {

    case "23505":
      statusCode = 409;
      message = "Duplicate record already exists.";
      break;

    case "23503":
      statusCode = 400;
      message = "Invalid reference data.";
      break;

    case "23502":
      statusCode = 400;
      message = "Required field is missing.";
      break;

    case "22P02":
      statusCode = 400;
      message = "Invalid input format.";
      break;

  }

  /**
   * ----------------------------------------
   * JWT Errors
   * ----------------------------------------
   */

  if (err.name === "JsonWebTokenError") {

    statusCode = 401;
    message = "Invalid authentication token.";

  }

  if (err.name === "TokenExpiredError") {

    statusCode = 401;
    message = "Authentication token has expired.";

  }

  /**
   * ----------------------------------------
   * Validation Errors
   * ----------------------------------------
   */

  if (
    err.name === "ValidationError"
  ) {

    statusCode = 400;

  }

  /**
   * ----------------------------------------
   * Response
   * ----------------------------------------
   */

  return res.status(statusCode).json({

    success: false,

    statusCode,

    message,

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),

  });

};

export default errorHandler;