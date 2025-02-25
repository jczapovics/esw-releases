
import { useNavigate, Link } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddReleaseSheet } from "./AddReleaseSheet";
import { AddIncidentSheet } from "./AddIncidentSheet";

const mainNavigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAddReleaseOpen, setIsAddReleaseOpen] = useState(false);
  const [isAddIncidentOpen, setIsAddIncidentOpen] = useState(false);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 relative overflow-hidden">
        <Sidebar>
          <SidebarContent>
            <div className="px-3 py-4 flex flex-col h-full relative">
              <div className="mb-8 relative z-10">
                <h1 className="text-2xl font-bold text-brand-700">
                  Central Engineering
                </h1>
              </div>
              <nav className="space-y-1 relative z-10">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-6 py-2.5 text-gray-700 rounded-full transition-all duration-300 transform hover:translate-x-1 ${
                      window.location.pathname === item.href ? 'bg-brand-50 text-brand-700 shadow-sm' : 'hover:bg-brand-50/50 hover:text-brand-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {/* Sign Out at the bottom */}
              <div className="mt-auto relative z-10">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center px-6 py-2.5 text-gray-700 rounded-full transition-all duration-300 transform hover:translate-x-1 hover:bg-brand-50/50 hover:text-brand-700"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8 relative z-10">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <SidebarTrigger />
              </div>
            </div>
            <div className="animate-fadeIn animate-slideIn">
              {children}
            </div>
          </div>
        </main>

        <AddReleaseSheet 
          isOpen={isAddReleaseOpen}
          onClose={() => setIsAddReleaseOpen(false)}
        />
        <AddIncidentSheet 
          isOpen={isAddIncidentOpen}
          onClose={() => setIsAddIncidentOpen(false)}
        />
      </div>
    </SidebarProvider>
  );
}
