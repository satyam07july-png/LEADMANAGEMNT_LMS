import ApiError from "../utils/ApiError.js";

import {

    getCampaignAnalyticsRepository,

} from "../repositories/campaignAnalyticsRepository.js";

/**
 * =====================================================
 * Campaign Analytics Service
 * =====================================================
 */

export const getCampaignAnalyticsService = async (
    campaignId
) => {

    const analytics =
        await getCampaignAnalyticsRepository(
            campaignId
        );

    if (!analytics) {

        throw new ApiError(
            404,
            "Campaign not found."
        );

    }

    return analytics;

};