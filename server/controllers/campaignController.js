import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createCampaignService,
  getAllCampaignsService,
  getCampaignByIdService,
  updateCampaignService,
  deleteCampaignService,
  restoreCampaignService,
  getCampaignStatisticsService,
} from "../services/campaignService.js";

/**
 * =====================================================
 * Create Campaign
 * =====================================================
 */

export const createCampaign = asyncHandler(async (req, res) => {

  const campaign = await createCampaignService(
    req.body,
    req.user,
    req
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      campaign,
      "Campaign created successfully."
    )
  );

});

/**
 * =====================================================
 * Get All Campaigns
 * =====================================================
 */

export const getAllCampaigns = asyncHandler(async (req, res) => {

  const campaigns = await getAllCampaignsService(
    req.query
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      campaigns,
      "Campaigns fetched successfully."
    )
  );

});

/**
 * =====================================================
 * Get Campaign By ID
 * =====================================================
 */

export const getCampaignById = asyncHandler(async (req, res) => {

  const campaign = await getCampaignByIdService(
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      campaign,
      "Campaign fetched successfully."
    )
  );

});

/**
 * =====================================================
 * Update Campaign
 * =====================================================
 */

export const updateCampaign = asyncHandler(async (req, res) => {

  const campaign = await updateCampaignService(

    req.params.id,

    req.body,

    req.user,

    req

  );

  return res.status(200).json(

    new ApiResponse(

      200,

      campaign,

      "Campaign updated successfully."

    )

  );

});

/**
 * =====================================================
 * Delete Campaign
 * =====================================================
 */

export const deleteCampaign = asyncHandler(async (req, res) => {

  const campaign = await deleteCampaignService(

    req.params.id,

    req.user,

    req

  );

  return res.status(200).json(

    new ApiResponse(

      200,

      campaign,

      "Campaign deleted successfully."

    )

  );

});

/**
 * =====================================================
 * Restore Campaign
 * =====================================================
 */

export const restoreCampaign = asyncHandler(async (req, res) => {

  const campaign = await restoreCampaignService(

    req.params.id,

    req.user,

    req

  );

  return res.status(200).json(

    new ApiResponse(

      200,

      campaign,

      "Campaign restored successfully."

    )

  );

});

/**
 * =====================================================
 * Campaign Statistics
 * =====================================================
 */

export const getCampaignStatistics = asyncHandler(async (req, res) => {

  const statistics =
    await getCampaignStatisticsService();

  return res.status(200).json(

    new ApiResponse(

      200,

      statistics,

      "Campaign statistics fetched successfully."

    )

  );

});