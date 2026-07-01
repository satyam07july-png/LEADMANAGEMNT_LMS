import { v4 as uuid } from "uuid";

/**
 * =====================================================
 * Request ID Middleware
 * =====================================================
 */

const requestId = (req, res, next) => {

  req.requestId = uuid();

  res.setHeader(
    "X-Request-Id",
    req.requestId
  );

  next();

};

export default requestId;