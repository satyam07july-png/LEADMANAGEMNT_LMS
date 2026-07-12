import {
  LayoutDashboard,
  UserPlus,
  Megaphone,
  GraduationCap,
  BookOpen,
  Users,
  FileBarChart,
  Settings,
  Library,
  School,
  Wallet,
} from "lucide-react";

const menuItems = [

  {
    title: "MAIN",

    items: [

      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },

      {
        title: "Lead Management",
        icon: UserPlus,
        path: "/leads",
      },

      {
        title: "Campaigns",
        icon: Megaphone,
        path: "/campaigns",
      },

    ],
  },

  {
    title: "ACADEMICS",

    items: [

      {
        title: "Admissions",
        icon: GraduationCap,
        path: "/admissions",
      },

      {
        title: "Students",
        icon: BookOpen,
        path: "/students",
      },

      

    ],
  },

];

export default menuItems;