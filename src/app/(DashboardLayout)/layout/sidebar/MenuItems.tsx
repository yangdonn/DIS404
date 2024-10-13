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
];

export default Menuitems;
