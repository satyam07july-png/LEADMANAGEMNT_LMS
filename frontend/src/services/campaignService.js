import axiosInstance from "../api/axiosInstance";

/**
 * ==========================================
 * Get Campaigns
 * ==========================================
 */
export const getCampaigns = async (params) => {
  const response = await axiosInstance.get("/campaigns", {
    params,
  });

  return response.data;
};

/**
 * ==========================================
 * Get Campaign Statistics
 * ==========================================
 */
export const getCampaignStats = async () => {
  const response = await axiosInstance.get(
    "/campaigns/statistics"
  );

  return response.data;
};

/**
 * ==========================================
 * Get Campaign Analytics
 * ==========================================
 */
export const getCampaignAnalytics = async (id) => {
  const response = await axiosInstance.get(
    `/campaigns/${id}/analytics`
  );

  return response.data;
};

/**
 * ==========================================
 * Get Campaign By Id
 * ==========================================
 */
export const getCampaignById = async (id) => {
  const response = await axiosInstance.get(
    `/campaigns/${id}`
  );

  return response.data;
};

/**
 * ==========================================
 * Create Campaign
 * ==========================================
 */
export const createCampaign = async (data) => {
  const response = await axiosInstance.post(
    "/campaigns",
    data
  );

  return response.data;
};

/**
 * ==========================================
 * Update Campaign
 * ==========================================
 */
export const updateCampaign = async (id, data) => {
  const response = await axiosInstance.put(
    `/campaigns/${id}`,
    data
  );

  return response.data;
};

/**
 * ==========================================
 * Delete Campaign
 * ==========================================
 */
export const deleteCampaign = async (id) => {
  const response = await axiosInstance.delete(
    `/campaigns/${id}`
  );

  return response.data;
};

/**
 * ==========================================
 * Restore Campaign
 * ==========================================
 */
export const restoreCampaign = async (id) => {
  const response = await axiosInstance.patch(
    `/campaigns/${id}/restore`
  );

  return response.data;
};