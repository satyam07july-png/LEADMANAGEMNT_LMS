import {

  getDashboardSummaryRepository,

  getRecentLeadsRepository,

  getRunningCampaignsRepository,

  getUpcomingFollowUpsRepository,

  getRecentActivitiesRepository,

} from "../repositories/dashboardRepository.js";

/**
 * =====================================================
 * Dashboard Service
 * =====================================================
 */

export const getDashboardService = async () => {

  const [

    summary,

    recentLeads,

    runningCampaigns,

    upcomingFollowUps,

    recentActivities,

  ] = await Promise.all([

    getDashboardSummaryRepository(),

    getRecentLeadsRepository(),

    getRunningCampaignsRepository(),

    getUpcomingFollowUpsRepository(),

    getRecentActivitiesRepository(),

  ]);

  return {

    summary,

    recentLeads,

    runningCampaigns,

    upcomingFollowUps,

    recentActivities,

  };

};