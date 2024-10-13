import {
  IconLayoutDashboard,
  IconClipboardList,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/Admin",
  },
];

export default Menuitems;
