import axiosInstance from "../api/axiosInstance";

// ===================================
// Get My Leads
// ===================================

export const getMyLeads = async (params = {}) => {

  const response = await axiosInstance.get(
    "/employee/my-leads",
    {
      params,
    }
  );

  return response.data;

};