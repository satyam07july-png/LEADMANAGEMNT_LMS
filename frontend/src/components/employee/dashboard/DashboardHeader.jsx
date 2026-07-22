import "./DashboardHeader.css";
import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    }

    return (

        <div className="dashboard-header">

            <div className="dashboard-header-left">

                <h1>
                    {greeting},
                    <span className="employee-name">
                        Employee
                    </span>
                    👋
                </h1>

                <p>
                    Welcome back! Here's what's happening today.
                </p>

            </div>

            <div className="dashboard-date-card">

                <div className="dashboard-date-icon">

                    <CalendarDays size={22} />

                </div>

                <div>

                    <span className="dashboard-date-label">

                        Today

                    </span>

                    <h3>

                        {today}

                    </h3>

                </div>

            </div>

        </div>

    );

};

export default DashboardHeader;