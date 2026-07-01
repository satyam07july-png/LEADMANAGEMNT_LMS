import ApiError from "../utils/ApiError.js";
import errorLogger from "../utils/errorLogger.js";

const errorHandler = (
  err,
  req,
  res,
  next
) => {

  errorLogger({
    error: err,
    req,
  });

  if (err instanceof ApiError) {

    return res.status(err.statusCode).json({

      success: false,

      statusCode: err.statusCode,

      message: err.message,

    });

  }

  return res.status(500).json({

    success: false,

    statusCode: 500,

    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",

  });

};

export default errorHandler;