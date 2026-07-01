import logger from "./logger.js";

/**
 * =====================================================
 * Enterprise Error Logger
 * =====================================================
 */

const errorLogger = ({
  error,
  req,
}) => {

  logger.error({

    type: "ERROR",

    message: error.message,

    statusCode: error.statusCode || 500,

    stack: process.env.NODE_ENV === "development"
      ? error.stack
      : undefined,

    requestId: req.requestId,

    method: req.method,

    url: req.originalUrl,

    ip: req.ip,

    userId: req.user?.id || null,

    role: req.user?.role || null,

    timestamp: new Date().toISOString(),

  });

};

export default errorLogger;