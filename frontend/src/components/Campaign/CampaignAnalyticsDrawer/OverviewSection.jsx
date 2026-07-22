const formatDate = (date) => {

  if (!date) return "--";

  return new Date(date).toLocaleDateString("en-IN");

};

const OverviewSection = ({ campaign }) => {

  return (

    <div className="overview-section">

      {/* Information */}

      <div className="overview-card">

        <h3>Campaign Information</h3>

        <div className="overview-grid">

          <InfoItem
            label="Campaign Code"
            value={campaign?.campaign_code}
          />

          <InfoItem
            label="Platform"
            value={campaign?.platform}
          />

          <InfoItem
            label="Source"
            value={campaign?.source}
          />

          <InfoItem
            label="Status"
            value={campaign?.status}
          />

          <InfoItem
            label="Budget"
            value={`₹ ${Number(
              campaign?.budget || 0
            ).toLocaleString("en-IN")}`}
          />

          <InfoItem
            label="Start Date"
            value={formatDate(campaign?.start_date)}
          />

          <InfoItem
            label="End Date"
            value={formatDate(campaign?.end_date)}
          />

          <InfoItem
            label="Created"
            value={formatDate(campaign?.created_at)}
          />

        </div>

      </div>

      {/* Landing Page */}

      <div className="overview-card">

        <h3>Landing Page</h3>

        <a
          href={campaign?.landing_page_url}
          target="_blank"
          rel="noreferrer"
          className="landing-link"
        >

          {campaign?.landing_page_url || "--"}

        </a>

      </div>

      {/* Description */}

      <div className="overview-card">

        <h3>Description</h3>

        <p className="campaign-description">

          {campaign?.description || "--"}

        </p>

      </div>

    </div>

  );

};

const InfoItem = ({
  label,
  value,
}) => (

  <div className="info-item">

    <span>{label}</span>

    <strong>{value || "--"}</strong>

  </div>

);

export default OverviewSection;