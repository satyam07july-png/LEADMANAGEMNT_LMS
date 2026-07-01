import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new ApiError(401, "Authorization token is required")
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return next(
        new ApiError(401, "Token has expired")
      );
    }

    return next(
      new ApiError(401, "Invalid authentication token")
    );

  }
};

export default authMiddleware;