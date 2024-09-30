import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconClipboardList,
  IconCalendarTime,
  IconUsers,
  IconChartBar,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Membership",
    icon: IconClipboardList, 
    href: "/Membership", 
  }, 
  {
    id: uniqueId(),
    title: "Events",
    icon: IconCalendarTime,
    href: "/Events", 
  }, 
  {
    id: uniqueId(),
    title: "Statistics",
    icon: IconChartBar, 
    href: "/Statistics", 
  }, 

  {
    navlabel: true,
    subheader: "Not needed but keep it",
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },

  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },

  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
