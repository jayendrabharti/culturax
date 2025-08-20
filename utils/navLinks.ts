import { InfoIcon, LayoutDashboardIcon } from "lucide-react";
import {
  FaHome,
  FaCalendarAlt,
  FaRegListAlt,
  FaEnvelope,
} from "react-icons/fa";

export interface NavBarLinkType {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const NavBarLinks: NavBarLinkType[] = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Events", href: "/events", icon: FaCalendarAlt },
  { name: "Schedule", href: "/schedule", icon: FaRegListAlt },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
];
export const QuickLinks: NavBarLinkType[] = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Events", href: "/events", icon: FaCalendarAlt },
  { name: "Schedule", href: "/schedule", icon: FaRegListAlt },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { name: "Contact Us", href: "/contact", icon: FaEnvelope },
  { name: "About Us", href: "/aboutus", icon: InfoIcon },
];

export const PolicyLinks: NavBarLinkType[] = [
  { name: "Terms & Conditions", href: "/terms-and-conditions", icon: InfoIcon },
  { name: "Privacy Policy", href: "/privacy-policy", icon: InfoIcon },
  { name: "Refund Policy", href: "/refund-policy", icon: InfoIcon },
];
