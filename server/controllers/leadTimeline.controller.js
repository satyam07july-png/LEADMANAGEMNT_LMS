import {
  getLeadTimelineService,
} from "../services/leadTimeline.service.js";

/**
 * =====================================================
 * Get Lead Timeline
 * =====================================================
 */
export const getLeadTimelineController = async (
  req,
  res,
  next
) => {
  try {
    const { leadId } = req.params;

    const timeline = await getLeadTimelineService(leadId);

    return res.status(200).json({
      success: true,
      message: "Lead timeline fetched successfully.",
      data: timeline,
    });

  } catch (error) {
    next(error);
  }
};