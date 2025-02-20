
import { useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Box, LayoutDashboard, AlertCircle, LogOut } from "lucide-react";

const mainNavigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Releases", href: "/releases", icon: Box },
  { name: "Incidents", href: "/incidents", icon: AlertCircle },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarContent>
            <div className="px-3 py-4 flex flex-col h-full">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-brand-700">
                  ESW Releases
                </h1>
              </div>
              <nav className="space-y-1">
                {mainNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-brand-50 hover:text-brand-700 transition-all duration-200 ${
                      window.location.pathname === item.href ? 'bg-brand-50 text-brand-700' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </a>
                ))}
              </nav>
              {/* Sign Out at the bottom */}
              <div className="mt-auto pt-4">
                <a
                  href="/login"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-brand-50 hover:text-brand-700 transition-all duration-200"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </a>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <SidebarTrigger />
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
