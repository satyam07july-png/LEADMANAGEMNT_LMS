import {

  getDashboardSummaryRepository,

  getRecentLeadsRepository,

  getRunningCampaignsRepository,

  getUpcomingFollowUpsRepository,

  getRecentActivitiesRepository,

  getLeadAnalyticsRepository,

} from "../repositories/dashboardRepository.js";

/**
 * =====================================================
 * Dashboard Overview
 * =====================================================
 */
export const getDashboardOverviewService = async () => {

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

/**
 * =====================================================
 * Lead Analytics
 * =====================================================
 */
export const getLeadAnalyticsService = async () => {

  return await getLeadAnalyticsRepository();

};