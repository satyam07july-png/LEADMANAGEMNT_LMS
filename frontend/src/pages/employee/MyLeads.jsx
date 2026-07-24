import { useEffect, useState } from "react";

import "./MyLeads.css";

import MyLeadsHeader from "../../components/employee/myLeads/MyLeadsHeader/MyLeadsHeader";
import SearchFilterBar from "../../components/employee/myLeads/SearchFilterBar/SearchFilterBar";
import LeadsTable from "../../components/employee/myLeads/LeadsTable/LeadsTable";

import { getMyLeads } from "../../services/employeeLeadService";

const MyLeads = () => {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLeads();
  }, []);

  const fetchMyLeads = async () => {

    try {

      setLoading(true);

      const response = await getMyLeads();

      setLeads(response.data.leads);

    } catch (error) {

      console.error("Error fetching leads:", error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="my-leads-page">

      <MyLeadsHeader />

      <SearchFilterBar />

      <LeadsTable
        leads={leads}
        loading={loading}
        onRefresh={fetchMyLeads}
      />

    </div>

  );

};

export default MyLeads;