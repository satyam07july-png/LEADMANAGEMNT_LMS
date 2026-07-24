import { X } from "lucide-react";
import "./LeadDetailsDrawer.css";
import { useEffect, useState } from "react";
import { updateLeadStatus } from "../../../services/leadService";

const LeadDetailsDrawer = ({
  open,
  lead,
  onClose,
  onStatusUpdated,
}) => {
  const [status, setStatus] = useState("PENDING");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status || "PENDING");
      setFeedback(lead.feedback || "");
    }
  }, [lead]);

 const handleSave = async () => {
  try {

   await updateLeadStatus(lead.id, {
  status,
  feedback,
});

await onStatusUpdated?.();

onClose();

// Refresh parent table
if (onStatusUpdated) {
  await onStatusUpdated();
}

// Close Drawer
onClose();

    alert("Lead updated successfully.");

    onClose();

    // Parent component ko refresh karna hai
    if (typeof window.refreshMyLeads === "function") {
      window.refreshMyLeads();
    }

  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Something went wrong."
    );
  }
};
  if (!open || !lead) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>

      <div className="lead-drawer">

        {/* Header */}

        <div className="drawer-header">
          <h2>Lead Details</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="drawer-body">

          <h3>Personal Information</h3>

          <div className="info-row">
            <span>Name</span>
            <strong>{lead.full_name}</strong>
          </div>

          <div className="info-row">
            <span>Mobile</span>
            <strong>{lead.mobile}</strong>
          </div>

          <div className="info-row">
            <span>Email</span>
            <strong>{lead.email || "-"}</strong>
          </div>

          <div className="info-row">
            <span>Course</span>
            <strong>{lead.campaign_name || "-"}</strong>
          </div>

          <div className="info-row">
            <span>Source</span>
            <strong>{lead.source || "-"}</strong>
          </div>

          <div className="info-row">
            <span>Priority</span>
            <strong>{lead.priority || "-"}</strong>
          </div>

          <div className="info-row">
            <span>Status</span>

            <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="NOT_CONTACTED">Not Contacted</option>
  <option value="FOLLOW_UP">Follow-up</option>
  <option value="INTERESTED">Interested</option>
  <option value="NOT_INTERESTED">Not Interested</option>
  <option value="WALKED_IN">Walked In</option>
  <option value="ENROLLED">Enrolled</option>
</select>
          </div>

          {status === "REJECTED" && (
            <div className="feedback-section">
              <label>
                Feedback <span>*</span>
              </label>

              <textarea
                rows={5}
                placeholder="Enter rejection reason..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          )}

        </div>

        {/* Footer */}

        <div className="drawer-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            disabled={status === "REJECTED" && !feedback.trim()}
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>
    </>
  );
};

export default LeadDetailsDrawer;