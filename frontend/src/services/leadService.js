import axiosInstance from "../api/axiosInstance";

// ===============================
// Single Lead Assignment
// ===============================

export const assignLead = async (
  leadId,
  employeeId
) => {

  const response = await axiosInstance.patch(

    `/leads/${leadId}/assign`,

    {
      employee_id: employeeId,
    }

  );

  return response.data;

};

// ===============================
// Bulk Lead Assignment
// ===============================

export const assignBulkLeads = async (
  payload
) => {

  const response = await axiosInstance.post(

    "/leads/assign-bulk",

    payload

  );

  return response.data;

};