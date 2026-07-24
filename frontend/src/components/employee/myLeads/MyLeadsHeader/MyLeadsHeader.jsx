import "./MyLeadsHeader.css";
import { Plus, Download } from "lucide-react";

const MyLeadsHeader = () => {

    return (

        <div className="my-leads-header">

            <div className="header-left">

                <h2>My Leads</h2>

                <p>
                    Manage and track all assigned leads from one place.
                </p>

            </div>

            <div className="header-right">

                <button className="export-btn">

                    <Download size={18} />

                    Export

                </button>

                <button className="followup-btn">

                    <Plus size={18} />

                    Add Follow-up

                </button>

            </div>

        </div>

    );

};

export default MyLeadsHeader;