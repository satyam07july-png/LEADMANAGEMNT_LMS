import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getEmployeeDashboardService,
} from "../services/employeePortal.service.js";

/**
 * =====================================================
 * Employee Dashboard
 * =====================================================
 */

export const getEmployeeDashboard = asyncHandler(async (req, res) => {

  const userId = req.user.id;

  const dashboard =
    await getEmployeeDashboardService(userId);

  return res.status(200).json(

    new ApiResponse(
      200,
      dashboard,
      "Employee dashboard fetched successfully."
    )

  );

});