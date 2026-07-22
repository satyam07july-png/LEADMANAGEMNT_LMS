import {
  Megaphone,
  Activity,
  Users,
  TrendingUp,
} from "lucide-react";

const CampaignStats = ({
  stats = {},
  loading = false,
}) => {

  const cards = [

    {
      title: "Total Campaigns",
      value: stats.total_campaigns || 0,
      icon: <Megaphone size={24} />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },

    {
      title: "Active Campaigns",
      value: stats.active_campaigns || 0,
      icon: <Activity size={24} />,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },

    {
      title: "Total Leads",
      value: stats.total_leads || 0,
      icon: <Users size={24} />,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },

    {
      title: "Conversion Rate",
      value: `${stats.conversion_rate || 0}%`,
      icon: <TrendingUp size={24} />,
      bg: "bg-violet-50",
      text: "text-violet-600",
    },

  ];

  return (

    <section className="campaign-stats">

      {

        cards.map((card) => (

          <div
            key={card.title}
            className="stat-card"
          >

            <div className="flex items-center justify-between">

              <div>

                <h5>

                  {card.title}

                </h5>

                <h2>

                  {

                    loading

                      ? "--"

                      : card.value

                  }

                </h2>

              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl

                  ${card.bg}
                  ${card.text}
                `}
              >

                {card.icon}

              </div>

            </div>

          </div>

        ))

      }

    </section>

  );

};

export default CampaignStats;