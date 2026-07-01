import ApiError from "../utils/ApiError.js";

/**
 * =====================================================
 * Route Not Found Middleware
 * =====================================================
 */

const notFound = (
  req,
  res,
  next
) => {

  next(

    new ApiError(
      404,
      `Route not found : ${req.originalUrl}`
    )

  );

};

export default notFound;