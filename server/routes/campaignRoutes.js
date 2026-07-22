import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validate from "../middleware/validate.js";

import ROLES from "../constants/roles.js";

import {

  createCampaignValidator,
  updateCampaignValidator,
  campaignIdValidator,

} from "../validators/campaign.validator.js";

import {

  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  restoreCampaign,
  getCampaignStatistics,
  getCampaignAnalytics,

} from "../controllers/campaignController.js";

const router = express.Router();

/**
 * =====================================================
 * Campaign CRUD
 * =====================================================
 */

router.post(

  "/",

  authMiddleware,

  roleMiddleware(ROLES.ADMIN),

  createCampaignValidator,

  validate,

  createCampaign

);

router.get(

  "/",

  authMiddleware,

  getAllCampaigns

);

/**
 * Statistics
 * Static route should always come before /:id
 */

router.get(

  "/statistics",

  authMiddleware,

  getCampaignStatistics

);

router.get(

  "/:id",

  authMiddleware,

  campaignIdValidator,

  validate,

  getCampaignById

);

router.put(

  "/:id",

  authMiddleware,

  roleMiddleware(ROLES.ADMIN),

  updateCampaignValidator,

  validate,

  updateCampaign

);

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware(ROLES.ADMIN),

  campaignIdValidator,

  validate,

  deleteCampaign

);

router.patch(

  "/:id/restore",

  authMiddleware,

  roleMiddleware(ROLES.ADMIN),

  campaignIdValidator,

  validate,

  restoreCampaign

);

/**
 * =====================================================
 * Campaign Analytics
 * Must be before /:id route
 * =====================================================
 */

router.get(

  "/:id/analytics",

  authMiddleware,

  campaignIdValidator,

  validate,

  getCampaignAnalytics

);

export default router;