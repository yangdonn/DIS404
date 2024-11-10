import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconClipboardList,
  IconCalendarTime,
  IconEdit,
  IconLogin
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
    title: "Club information",
    icon: IconEdit,
    href: "/ClubDetail", 
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin, 
    href: "authentication/login", 
  },
];

export default Menuitems;
