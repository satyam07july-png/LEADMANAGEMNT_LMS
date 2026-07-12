import axiosInstance from "../api/axiosInstance";

/*
=========================================
Dashboard Overview
=========================================
*/

export const getDashboardOverview = async () => {

  const response = await axiosInstance.get(
    "/dashboard/overview"
  );

  return response.data;

};

/*
=========================================
Lead Analytics
=========================================
*/

export const getLeadAnalytics = async () => {

  const response = await axiosInstance.get(
    "/dashboard/lead-analytics"
  );

  return response.data;

};