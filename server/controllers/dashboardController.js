import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getDashboardService,
} from "../services/dashboardService.js";

/**
 * =====================================================
 * Dashboard
 * =====================================================
 */

export const getDashboard = asyncHandler(

  async (req, res) => {

    const dashboard =

      await getDashboardService();

    return res.status(200).json(

      new ApiResponse(

        200,

        dashboard,

        "Dashboard fetched successfully."

      )

    );

  }

);