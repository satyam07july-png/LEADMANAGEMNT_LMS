import { Plus, RefreshCw } from "lucide-react";

const CampaignHeader = ({
  loading = false,
  onRefresh,
  onAdd,
}) => {
  return (
    <div className="campaign-header">

      <div className="campaign-title">

        <h1>Campaign Management</h1>

        <p>
          Manage all marketing campaigns across Meta, Google,
          Website and other lead sources.
        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          className="add-campaign-btn"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>

        <button
          className="add-campaign-btn"
          onClick={onAdd}
        >
          <Plus size={18} />

          Add Campaign
        </button>

      </div>

    </div>
  );
};

export default CampaignHeader;