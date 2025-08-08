import {
  AtSign,
  HomeIcon,
  BookOpenIcon,
  CalculatorIcon,
  BellIcon,
  HelpCircleIcon,
} from "lucide-react";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { anurati } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { appName } from "@/utils/data";

export const QuickLinksList = [
  { name: "Home", href: "/home", icon: HomeIcon },
  { name: "Tools", href: "/tools", icon: CalculatorIcon },
  { name: "Resources", href: "/resources", icon: BookOpenIcon },
  { name: "Announcements", href: "/announcements", icon: BellIcon },
];

const SupportLinksList = [
  { name: "Contact", href: "/contact", icon: AtSign },
  { name: "Help", href: "/help", icon: HelpCircleIcon },
  { name: "FAQ", href: "/faq", icon: HelpCircleIcon },
];

const SocialsLinkList = [
  {
    name: "GitHub",
    href: "https://github.com/jayendrabharti/uni_help",
    icon: BsGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jayendrabharti/",
    icon: BsLinkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/jayendra.bharti",
    icon: BsInstagram,
  },
  { name: "Twitter", href: "https://x.com/Jayendra_Bharti", icon: BsTwitterX },
];

export default async function Footer() {
  return (
    <footer className="mx-auto mt-20 max-w-6xl p-4">
      <div className="border-border border-t pt-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link
              href="/home"
              className={cn(`mb-4 block text-2xl font-bold`, anurati.className)}
            >
              {appName.toUpperCase()}
            </Link>
            <p className="text-muted-foreground mb-4 text-sm">
              Your comprehensive academic companion for LPU students. Built by
              students, for students.
            </p>
            <div className="flex space-x-4">
              {SocialsLinkList.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {QuickLinksList.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                  >
                    <link.icon size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2">
              {SupportLinksList.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                  >
                    <link.icon size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coming Soon */}
          <div>
            <h3 className="mb-4 font-semibold">Coming Soon</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Course-wise Resources</li>
              <li>• Study Groups</li>
              <li>• Grade Predictor</li>
              <li>• Mobile App</li>
              <li>• AI Study Assistant</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-border mt-8 flex flex-col items-center justify-between border-t pt-6 md:flex-row">
          <div className="text-muted-foreground mb-4 text-sm md:mb-0">
            © 2025 {appName}. Made with ❤️ for LPU students.
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Developed by</span>
            <Link
              href="https://github.com/jayendrabharti"
              target="_blank"
              className="bg-muted hover:text-primary hover:ring-ring flex items-center gap-2 rounded-md px-3 py-1 font-medium transition-all hover:ring-2"
            >
              <BsGithub size={16} />
              Jayendra Bharti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
