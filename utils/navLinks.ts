import { LayoutDashboardIcon } from "lucide-react";
import {
  FaHome,
  FaCalendarAlt,
  FaRegListAlt,
  FaEnvelope,
  FaUserPlus,
} from "react-icons/fa";

export interface NavBarLinkType {
  name: string;
  href: string;
  special?: boolean;
  showInNav: boolean;
  icon: React.ElementType;
}

export const NavBarLinks: NavBarLinkType[] = [
  { name: "Home", href: "/", icon: FaHome, showInNav: true },
  { name: "Events", href: "/events", icon: FaCalendarAlt, showInNav: true },
  { name: "Schedule", href: "/schedule", icon: FaRegListAlt, showInNav: true },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
    showInNav: true,
  },
  { name: "Contact Us", href: "/contact", icon: FaEnvelope, showInNav: false },
];
