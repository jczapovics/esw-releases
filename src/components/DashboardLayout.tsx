
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  AlertCircle,
  Boxes,
  Activity,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar, SidebarProvider } from "./ui/sidebar";

interface Props {
  children: React.ReactNode;
}

const links = [
  {
    name: "Overview",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "Releases",
    href: "/releases",
    icon: Boxes,
  },
  {
    name: "Incidents",
    href: "/incidents",
    icon: AlertCircle,
  },
  {
    name: "Activity",
    href: "/activity",
    icon: Activity,
  },
];

const secondaryLinks = [
  {
    name: "Help",
    href: "/help",
    icon: HelpCircle,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const DashboardLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <div className="px-3 py-2">
            <Link
              to="/"
              className="px-3 py-2 flex items-center gap-1 mb-8 mt-2 text-xl"
            >
              <span className="font-bold text-brand-600">E</span>
              <span className="font-normal text-gray-600">SW</span>
              <span className="font-bold text-brand-600">R</span>
              <span className="font-normal text-gray-600">eleases</span>
            </Link>
            <div className="space-y-1">
              {links.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    pathname === link.href && "bg-gray-100"
                  )}
                  asChild
                >
                  <Link to={link.href}>
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="mt-8">
              <div className="space-y-1">
                {secondaryLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      pathname === link.href && "bg-gray-100"
                    )}
                    asChild
                  >
                    <Link to={link.href}>
                      <link.icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Sidebar>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};
