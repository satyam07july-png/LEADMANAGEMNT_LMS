const CampaignFilters = ({
  filters,
  onChange,
  onReset,
}) => {
  return (

    <div className="campaign-filter">

      {/* Search */}

      <input
        type="text"
        placeholder="Search Campaign..."
        value={filters.search}
        onChange={(e) =>
          onChange("search", e.target.value)
        }
      />

      {/* Platform */}

      <select
        value={filters.platform}
        onChange={(e) =>
          onChange("platform", e.target.value)
        }
      >

        <option value="">
          All Platforms
        </option>

        <option value="META">
          Meta Ads
        </option>

        <option value="GOOGLE">
          Google Ads
        </option>

        <option value="WEBSITE">
          Website
        </option>

        <option value="INSTAGRAM">
          Instagram
        </option>

        <option value="WHATSAPP">
          WhatsApp
        </option>

        <option value="REFERRAL">
          Referral
        </option>

        <option value="WALK_IN">
          Walk-In
        </option>

      </select>

      {/* Status */}

      <select
        value={filters.status}
        onChange={(e) =>
          onChange("status", e.target.value)
        }
      >

        <option value="">
          All Status
        </option>

        <option value="ACTIVE">
          Active
        </option>

        <option value="PAUSED">
          Paused
        </option>

        <option value="COMPLETED">
          Completed
        </option>

      </select>

      {/* Reset */}

      <button
        className="add-campaign-btn"
        onClick={onReset}
      >

        Reset

      </button>

    </div>

  );
};

export default CampaignFilters;