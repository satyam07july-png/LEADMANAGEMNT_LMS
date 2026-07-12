import axiosInstance from "../api/axiosInstance";

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