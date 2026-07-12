import axiosInstance from "../api/axiosInstance";

export const getEmployees = async () => {

    const response = await axiosInstance.get(
        "/employees"
    );

    return response.data;

};