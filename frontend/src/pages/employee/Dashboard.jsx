import "./Dashboard.css";

import DashboardHeader from "../../components/employee/dashboard/DashboardHeader";
import SummaryCards from "../../components/employee/dashboard/SummaryCards";
import RecentLeadsTable from "../../components/employee/dashboard/RecentLeadsTable";
import TodayFollowups from "../../components/employee/dashboard/TodayFollowups";
import LeadStatusChart from "../../components/employee/dashboard/LeadStatusChart";
import useEmployeeDashboard from "../../hooks/useEmployeeDashboard";


const Dashboard = () => {

    const {
        dashboard,
        loading,
        error,
        refreshDashboard,
    } = useEmployeeDashboard();



    return (

        <div className="employee-dashboard">

            <DashboardHeader />

            <SummaryCards
                summary={dashboard.summary}
            />

            <div className="dashboard-main-grid">

                <div className="dashboard-left">

                    <RecentLeadsTable
                        leads={dashboard.recentLeads}
                    />

                    <TodayFollowups
                        followUps={dashboard.todayFollowUps}
                    />

                </div>

                <div className="dashboard-right">

                    <LeadStatusChart
                        data={dashboard.leadStatus}
                    />

                </div>

            </div>

        </div>

    );
};

export default Dashboard;