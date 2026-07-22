import "./SummaryCards.css";

import {
    Users,
    PhoneCall,
    BadgeCheck,
    GraduationCap,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

const SummaryCards = ({ summary = {} }) => {

    const cards = [

        {
            title: "Assigned Leads",
            value: summary.assigned_leads ?? 0,
            icon: <Users size={28} />,
            color: "blue",
        },

        {
            title: "Today's Follow-ups",
            value: summary.today_followups ?? 0,
            icon: <PhoneCall size={28} />,
            color: "orange",
        },

        {
            title: "Interested Leads",
            value: summary.interested_leads ?? 0,
            icon: <BadgeCheck size={28} />,
            color: "green",
        },

        {
            title: "Admissions",
            value: summary.admissions ?? 0,
            icon: <GraduationCap size={28} />,
            color: "purple",
        },

    ];

    return (

        <div className="summary-cards">

            {cards.map((card) => (

                <SummaryCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    color={card.color}
                />

            ))}

        </div>

    );

};

export default SummaryCards;