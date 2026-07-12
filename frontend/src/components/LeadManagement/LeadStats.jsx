import "../../styles/LeadManagement/LeadStats.css";

import {
    Users,
    UserPlus,
    UserCheck,
    UserX,
    Copy,
    Target,
} from "lucide-react";

const LeadStats = ({
    stats = {},
    loading = false,
}) => {

    const cards = [

        {
            title: "Total Leads",
            value: Number(stats.total_leads || 0),
            subtitle: "Captured Leads",
            icon: Users,
            color: "blue",
        },

        {
            title: "Today's Leads",
            value: Number(stats.today_leads || 0),
            subtitle: "Today's Captured",
            icon: UserPlus,
            color: "green",
        },

        {
            title: "Assigned Leads",
            value: Number(stats.assigned_leads || 0),
            subtitle: "Assigned to Counsellors",
            icon: UserCheck,
            color: "purple",
        },

        {
            title: "Unassigned",
            value: Number(stats.unassigned_leads || 0),
            subtitle: "Need Assignment",
            icon: UserX,
            color: "orange",
        },

        {
            title: "Duplicate",
            value: Number(stats.duplicate_leads || 0),
            subtitle: "Duplicate Entries",
            icon: Copy,
            color: "red",
        },

        {
            title: "Conversion",
            value: `${stats.conversion_rate || 0}%`,
            subtitle: "Lead Conversion",
            icon: Target,
            color: "cyan",
        },

    ];

    return (

        <section className="lead-stats">

            {

                cards.map((card)=>{

                    const Icon = card.icon;

                    return(

                        <div
                            key={card.title}
                            className={`lead-stat-card ${card.color}`}
                        >

                            <div className="lead-stat-top">

                                <div>

                                    <span>

                                        {card.title}

                                    </span>

                                    <h2>

                                        {

                                            loading

                                            ? "--"

                                            : card.value

                                        }

                                    </h2>

                                    <p>

                                        {card.subtitle}

                                    </p>

                                </div>

                                <div className="lead-stat-icon">

                                    <Icon size={24}/>

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </section>

    );

};

export default LeadStats;