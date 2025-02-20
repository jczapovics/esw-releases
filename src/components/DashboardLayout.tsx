
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Box, LayoutDashboard, AlertCircle } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Releases", href: "/releases", icon: Box },
  { name: "Incidents", href: "/incidents", icon: AlertCircle },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarContent>
            <div className="px-3 py-4">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-brand-700">
                  ESW Release Tracker
                </h1>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
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
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <SidebarTrigger />
              </div>
              <div className="flex items-center space-x-4">
                <button className="glass-effect px-4 py-2 rounded-lg text-brand-700 hover:bg-brand-50 transition-all duration-200">
                  Sign In
                </button>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
