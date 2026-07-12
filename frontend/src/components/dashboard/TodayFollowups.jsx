import "../../styles/Dashboard/TodayFollowups.css";

import {
  CalendarDays,
  Phone,
  MessageCircle,
  Clock3,
  ArrowRight,
} from "lucide-react";

const priorityClasses = {

  HIGH: "priority-high",

  MEDIUM: "priority-medium",

  LOW: "priority-low",

};

const TodayFollowups = ({
  followups = [],
  loading = false,
}) => {

  if (loading) {

    return (

      <section className="dashboard-panel">

        <div className="panel-header">

          <div>

            <h3>

              Today's Follow-ups

            </h3>

            <p>

              Loading scheduled follow-ups...

            </p>

          </div>

        </div>

        <div className="loading-state">

          Loading...

        </div>

      </section>

    );

  }

  return (

    <section className="dashboard-panel">

      <div className="panel-header">

        <div>

          <h3>

            Today's Follow-ups

          </h3>

          <p>

            Scheduled counselling follow-ups

          </p>

        </div>

        <button className="view-all-btn">

          View All

          <ArrowRight size={16}/>

        </button>

      </div>

      {

        followups.length===0 ?

        (

          <div className="followup-empty">

            <CalendarDays size={46}/>

            <h4>

              No Follow-ups Scheduled

            </h4>

            <p>

              Today's scheduled follow-ups will appear here automatically.

            </p>

          </div>

        )

        :

        (

          <div className="followup-list">

            {

              followups.map((item,index)=>(

                <div

                  key={item.id || `${item.mobile}-${index}`}

                  className="followup-card"

                >

                  <div className="followup-left">

                    <div className="followup-avatar">

                      {

                        item.full_name?.charAt(0)

                      }

                    </div>

                    <div>

                      <h4>

                        {item.full_name}

                      </h4>

                      <p>

                        {item.mobile}

                      </p>

                      <span>

                        {item.course || "-"}

                      </span>

                    </div>

                  </div>

                  <div className="followup-center">

                    <div className="followup-time">

                      <Clock3 size={15}/>

                      {

                        item.followup_time ||

                        "Not Scheduled"

                      }

                    </div>

                    <span

                      className={`priority-badge ${priorityClasses[item.priority] || "priority-low"}`}

                    >

                      {

                        item.priority ||

                        "LOW"

                      }

                    </span>

                  </div>

                  <div className="followup-actions">

                    <button>

                      <Phone size={16}/>

                    </button>

                    <button>

                      <MessageCircle size={16}/>

                    </button>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </section>

  );

};

export default TodayFollowups;