import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

import {
  createLeadService,
  getAllLeadsService,
  getLeadByIdService,
  updateLeadService,
  deleteLeadService,
  updateLeadStatusService,
  assignLeadService,
  updateLeadPriorityService,
  updateLeadFollowupService,
  getDashboardService,
  getTodayFollowupsService,
  getRecentLeadsService,
  getLeadAnalyticsService,
} from "../services/leadService.js";

/**
 * =====================================================
 * Create Lead
 * =====================================================
 */
export const createLead = asyncHandler(async (req, res) => {
  const lead = await createLeadService({
    ...req.body,
    created_by: req.user?.id,
  });

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(
      HTTP_STATUS.CREATED,
      lead,
      "Lead created successfully."
    )
  );
});

/**
 * =====================================================
 * Get All Leads
 * =====================================================
 */
export const getAllLeads = asyncHandler(async (req, res) => {
  const leads = await getAllLeadsService(req.query);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      leads,
      "Leads fetched successfully."
    )
  );
});

/**
 * =====================================================
 * Get Lead By ID
 * =====================================================
 */
export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await getLeadByIdService(req.params.id);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      lead,
      "Lead fetched successfully."
    )
  );
});

/**
 * =====================================================
 * Update Lead
 * =====================================================
 */
export const updateLead = asyncHandler(async (req, res) => {
  const lead = await updateLeadService(
    req.params.id,
    req.body
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      lead,
      "Lead updated successfully."
    )
  );
});

/**
 * =====================================================
 * Delete Lead
 * =====================================================
 */
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await deleteLeadService(req.params.id);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      lead,
      "Lead deleted successfully."
    )
  );
});

/**
 * =====================================================
 * Update Lead Status
 * =====================================================
 */
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await updateLeadStatusService(
    req.params.id,
    req.body.status
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      lead,
      "Lead status updated successfully."
    )
  );
});

/**
 * =====================================================
 * Assign Lead
 * =====================================================
 */
export const assignLead = asyncHandler(async (req, res) => {
  const lead = await assignLeadService(
    req.params.id,
    req.body.employee_id
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      lead,
      "Lead assigned successfully."
    )
  );
});

/**
 * =====================================================
 * Update Lead Priority
 * =====================================================
 */
export const updateLeadPriority = asyncHandler(async (req, res) => {
  const lead = await updateLeadPriorityService(
    req.params.id,
    req.body.priority
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      lead,
      "Lead priority updated successfully."
    )
  );
});

/**
 * =====================================================
 * Update Lead Follow-up
 * =====================================================
 */
export const updateLeadFollowup = asyncHandler(async (req, res) => {
  const lead = await updateLeadFollowupService(
    req.params.id,
    req.body
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      lead,
      "Lead follow-up updated successfully."
    )
  );
});

/**
 * =====================================================
 * Dashboard
 * =====================================================
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getDashboardService();

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      dashboard,
      "Dashboard fetched successfully."
    )
  );
});

/**
 * =====================================================
 * Today's Follow-ups
 * =====================================================
 */
export const getTodayFollowups = asyncHandler(async (req, res) => {
  const followups =
    await getTodayFollowupsService();

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      followups,
      "Today's follow-ups fetched successfully."
    )
  );
});

/**
 * =====================================================
 * Recent Leads
 * =====================================================
 */
export const getRecentLeads = asyncHandler(async (req, res) => {
  const leads =
    await getRecentLeadsService(
      req.query.limit
    );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      leads,
      "Recent leads fetched successfully."
    )
  );
});

/**
 * =====================================================
 * Lead Analytics
 * =====================================================
 */
export const getLeadAnalytics = asyncHandler(async (req, res) => {
  const analytics =
    await getLeadAnalyticsService();

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      analytics,
      "Lead analytics fetched successfully."
    )
  );
});