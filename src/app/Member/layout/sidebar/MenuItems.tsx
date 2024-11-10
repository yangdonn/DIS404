import {
  IconLayoutDashboard,
  IconCalendarTime,
  IconClipboardList,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/Member/Dashboard",
  },
  {
    id: uniqueId(),
    title: "Events",
    icon: IconCalendarTime,
    href: "/Member/Events", 
  }, 
  {
    id: uniqueId(),
    title: "Clubs",
    icon:   IconClipboardList,
    href: "/Member", 
  }, 
];

export default Menuitems;
