import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getDashboardOverviewService,
  getLeadAnalyticsService,
} from "../services/dashboardService.js";

/**
 * =====================================================
 * Dashboard Overview
 * =====================================================
 */
export const getDashboardOverview = asyncHandler(
  async (req, res) => {

    const dashboard =
      await getDashboardOverviewService();

    return res.status(200).json(
      new ApiResponse(
        200,
        dashboard,
        "Dashboard overview fetched successfully."
      )
    );

  }
);

/**
 * =====================================================
 * Lead Analytics
 * =====================================================
 */
export const getLeadAnalytics = asyncHandler(
  async (req, res) => {

    const analytics =
      await getLeadAnalyticsService();

    return res.status(200).json(
      new ApiResponse(
        200,
        analytics,
        "Lead analytics fetched successfully."
      )
    );

  }
);