import logger from "./logger.js";

/**
 * =====================================================
 * Enterprise Audit Logger
 * =====================================================
 */

const auditLogger = ({
  action,
  userId = null,
  role = null,
  module = null,
  entityId = null,
  details = {},
  ip = null,
  requestId = null,
}) => {

  logger.info({

    type: "AUDIT",

    action,

    module,

    entityId,

    userId,

    role,

    ip,

    requestId,

    details,

    timestamp: new Date().toISOString(),

  });

};

export default auditLogger;