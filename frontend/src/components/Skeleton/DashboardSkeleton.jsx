import "../../styles/Dashboard/DashboardSkeleton.css";

const DashboardSkeleton = () => {

  return (

    <div className="dashboard-skeleton">

      {/* Header */}

      <div className="skeleton-header">

        <div className="skeleton-title"></div>

        <div className="skeleton-subtitle"></div>

      </div>

      {/* Stats */}

      <div className="skeleton-stats">

        {[1, 2, 3, 4].map((item) => (

          <div
            key={item}
            className="skeleton-card"
          >

            <div className="skeleton-line short"></div>

            <div className="skeleton-line big"></div>

            <div className="skeleton-footer"></div>

          </div>

        ))}

      </div>

      {/* Tables */}

      <div className="skeleton-middle">

        <div className="skeleton-table"></div>

        <div className="skeleton-table"></div>

      </div>

      {/* Followups */}

      <div className="skeleton-followup"></div>

    </div>

  );

};

export default DashboardSkeleton;