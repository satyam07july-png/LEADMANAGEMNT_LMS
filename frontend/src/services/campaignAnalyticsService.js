import axiosInstance from "../api/axiosInstance";

/* =====================================================
   Get Campaign Analytics
===================================================== */

export const getCampaignAnalytics = async (id) => {

  const response = await axiosInstance.get(
    `/campaigns/${id}/analytics`
  );

  return response.data;

};