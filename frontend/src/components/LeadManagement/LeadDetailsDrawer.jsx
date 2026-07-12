import { X } from "lucide-react";

import { useEffect, useState } from "react";


import { getLeadById } from "../../services/leadService";


const LeadDetailsDrawer = ({
  open = false,
  lead = null,
  onClose,
}) => {

  const [loading, setLoading] = useState(false);
  const [leadDetails, setLeadDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [

  {
    id: "overview",
    label: "Overview",
  },

  {
    id: "timeline",
    label: "Timeline",
  },

  {
    id: "notes",
    label: "Notes",
  },

  {
    id: "followups",
    label: "Follow-ups",
  },

];

<div className="border-b border-slate-200">

  <div className="flex">

    {

      tabs.map((tab)=>(

        <button

          key={tab.id}

          onClick={()=>setActiveTab(tab.id)}

          className={`

            flex-1

            border-b-2

            px-5

            py-4

            text-sm

            font-medium

            transition

            ${

              activeTab===tab.id

              ?

              "border-blue-600 text-blue-600"

              :

              "border-transparent text-slate-500 hover:text-slate-800"

            }

          `}

        >

          {tab.label}

        </button>

      ))

    }

  </div>

</div>

  const loadLead = async () => {

    if (!lead?.id) return;

    try {

      setLoading(true);

      const response = await getLeadById(lead.id);

      setLeadDetails(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (open) {

      loadLead();

    }

  }, [open, lead]);

  // ✅ Hooks ke baad return

  if (!open) {

    return null;

  }

  if (loading) {

    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  }

  return (

    <>

      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}

      <aside
        className="
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          flex-col
          bg-white
          shadow-2xl
          transition-all
          duration-300

          sm:w-[600px]
          xl:w-[700px]
        "
      >

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <h2 className="text-xl font-bold text-slate-800">

              {leadDetails?.full_name || "Lead Details"}

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {leadDetails?.lead_code}

            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >

            <X size={22} />

          </button>

        </div>

        

        {/* ========================= */}
        {/* Body */}
        {/* ========================= */}

       <div className="flex-1 overflow-y-auto p-6">

  {

    activeTab === "overview" && (

      <>

        {/* Profile */}

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">

            {leadDetails?.full_name?.charAt(0) || "L"}

          </div>

          <div>

            <h3 className="text-xl font-semibold text-slate-800">

              {leadDetails?.full_name}

            </h3>

            <p className="text-sm text-slate-500">

              {leadDetails?.lead_code}

            </p>

          </div>

        </div>

        {/* Details */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <InfoItem
            label="Mobile"
            value={leadDetails?.mobile}
          />

          <InfoItem
            label="Email"
            value={leadDetails?.email}
          />

          <InfoItem
            label="Course"
            value={leadDetails?.course_name}
          />

          <InfoItem
            label="Source"
            value={leadDetails?.source}
          />

          <InfoItem
            label="Status"
            value={leadDetails?.status}
          />

          <InfoItem
            label="Priority"
            value={leadDetails?.priority}
          />

          <InfoItem
            label="Assigned To"
            value={leadDetails?.assigned_employee}
          />

          <InfoItem
            label="Created"
            value={
              leadDetails?.created_at
                ? new Date(
                    leadDetails.created_at
                  ).toLocaleDateString("en-IN")
                : "--"
            }
          />

        </div>

      </>

    )

  }

  {

    activeTab === "timeline" && (

      <div className="py-12 text-center text-slate-500">

        Timeline Coming Soon

      </div>

    )

  }

  {

    activeTab === "notes" && (

      <div className="py-12 text-center text-slate-500">

        Notes Coming Soon

      </div>

    )

  }

  {

    activeTab === "followups" && (

      <div className="py-12 text-center text-slate-500">

        Follow-ups Coming Soon

      </div>

    )

  }

</div>

      </aside>

    </>

      );

};

const InfoItem = ({
  label,
  value,
}) => (

  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">

      {label}

    </p>

    <p className="mt-2 text-sm font-medium text-slate-800">

      {value || "--"}

    </p>

  </div>

);

export default LeadDetailsDrawer;