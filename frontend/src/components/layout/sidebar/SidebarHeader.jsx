import { GraduationCap } from "lucide-react";

const SidebarHeader = () => {

  return (

    <div className="sidebar-brand">

      <div className="brand-logo">

        <GraduationCap size={28} />

      </div>

      <div className="brand-content">

        <h1>IEM LMS</h1>

        <p>Admissions CRM</p>

      </div>

    </div>

  );

};

export default SidebarHeader;