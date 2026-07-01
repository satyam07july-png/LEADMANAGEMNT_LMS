import logger from "../utils/logger.js";

/**
 * =====================================================
 * Enterprise Request Logger
 * =====================================================
 */

const requestLogger = (req, res, next) => {

  const start = Date.now();

  res.on("finish", () => {

    const responseTime = Date.now() - start;

    logger.info({

      requestId: req.requestId,

      method: req.method,

      url: req.originalUrl,

      statusCode: res.statusCode,

      responseTime: `${responseTime} ms`,

      ip: req.ip,

      userAgent: req.get("User-Agent"),

      userId: req.user?.id || null,

      role: req.user?.role || null,

      timestamp: new Date().toISOString(),

    });

  });

  next();

};

export default requestLogger;