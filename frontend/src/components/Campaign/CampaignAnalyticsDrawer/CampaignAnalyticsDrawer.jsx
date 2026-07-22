import { X, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import "./CampaignAnalyticsDrawer.css";
import OverviewSection from "./OverviewSection";

import WeeklyLeadChart from "./WeeklyLeadChart";
import DrawerTabs from "./DrawerTabs";
import { getCampaignAnalytics } from "../../../services/campaignAnalyticsService";
import MonthlyLeadChart from "./MonthlyLeadChart";
import LeadStatusPie from "./LeadStatusPie";
import PreferredCentreChart from "./PreferredCentreChart";
const CampaignAnalyticsDrawer = ({
  open,
  campaign,
  onClose,
}) => {
  

  const [activeTab, setActiveTab] =
  useState("overview");


const [loading, setLoading] = useState(false);

const [analytics, setAnalytics] = useState(null);


const overview = analytics?.overview || {};

const campaignInfo =
  analytics?.campaign || campaign;


const loadAnalytics = async () => {

  if (!campaign?.id) return;

  try {

    setLoading(true);

    const response =
      await getCampaignAnalytics(
        campaign.id
      );

    setAnalytics(response.data);

  } catch (error) {

    console.error(
      "Campaign Analytics Error",
      error
    );

  } finally {

    setLoading(false);

  }

};
useEffect(() => {

  if (open) {

    loadAnalytics();

  }

}, [open, campaign]);

if (!open) return null;

if (loading) {

  return (

    <div className="campaign-loader">

      Loading Analytics...

    </div>

  );

}

  return (
    <>

      {/* Overlay */}

      <div
        className="campaign-drawer-overlay"
        onClick={onClose}
      />

      {/* Drawer */}

      <aside className="campaign-drawer">

        {/* Header */}

        <div className="campaign-drawer-header">

          <div className="campaign-header-left">

            <div className="campaign-icon">

              <BarChart3 size={24} />

            </div>

            <div>

              <h2>

                {campaign?.campaign_name || "Campaign Analytics"}

              </h2>

              <p>

                {campaign?.campaign_code}

              </p>

            </div>

          </div>

          <button
            className="campaign-close-btn"
            onClick={onClose}
          >

            <X size={22} />

          </button>

        </div>

        {/* Divider */}

        <div className="campaign-divider" />

        {/* Campaign Summary */}

        <DrawerTabs
    activeTab={activeTab}
    setActiveTab={setActiveTab}
/>

        {/* Body */}

        <div className="campaign-drawer-body">

      {

activeTab === "overview" && (

    <OverviewSection
    campaign={campaignInfo}
/>

)

}
<div className="analytics-dashboard">

<MonthlyLeadChart
data={analytics?.monthly_leads||[]}
/>

<div className="analytics-grid">

<LeadStatusPie
overview={analytics?.overview}
/>

<WeeklyLeadChart
data={analytics?.weekly_leads||[]}
/>

</div>

<PreferredCentreChart
    data={analytics?.centres || []}
/>

</div>
        </div>

      </aside>

    </>
  );

};

export default CampaignAnalyticsDrawer;