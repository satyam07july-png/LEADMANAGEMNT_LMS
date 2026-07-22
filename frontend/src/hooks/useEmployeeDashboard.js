import { useCallback, useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";
import axiosInstance from "../api/axiosInstance";

const initialDashboardState = {
    summary: {
        assigned_leads: 0,
        today_followups: 0,
        interested_leads: 0,
        admissions: 0,
    },
    recentLeads: [],
    todayFollowUps: [],
    leadStatus: [],
};

const useEmployeeDashboard = () => {

    const [dashboard, setDashboard] = useState(initialDashboardState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const response = await dashboardService.getEmployeeDashboard();

            if (response?.success) {

                setDashboard({
                    ...initialDashboardState,
                    ...response.data,
                });

            } else {

                throw new Error(
                    response?.message || "Failed to fetch dashboard."
                );

            }

        } catch (err) {

            console.error("Employee Dashboard Error:", err);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchDashboard();

    }, [fetchDashboard]);

    return {

        dashboard,
        loading,
        error,
        refreshDashboard: fetchDashboard,

    };

};

export default useEmployeeDashboard;