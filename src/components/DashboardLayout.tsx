
import { useNavigate, Link } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Box, LayoutDashboard, AlertCircle, LogOut, Plus, Monitor, Laptop, Database, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { AddReleaseSheet } from "./AddReleaseSheet";
import { AddIncidentSheet } from "./AddIncidentSheet";

const mainNavigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Releases", href: "/releases", icon: Box },
  { name: "Incidents", href: "/incidents", icon: AlertCircle },
];

const backgroundIcons = [Monitor, Laptop, Database, Code];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAddReleaseOpen, setIsAddReleaseOpen] = useState(false);
  const [isAddIncidentOpen, setIsAddIncidentOpen] = useState(false);

  const handleAddRelease = () => {
    setIsAddReleaseOpen(true);
  };

  const handleAddIncident = () => {
    setIsAddIncidentOpen(true);
  };

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
              {/* Icons pattern overlay - now inside the sidebar */}
              <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0">
                {[...Array(10)].map((_, i) => {
                  const Icon = backgroundIcons[i % backgroundIcons.length];
                  const positions = [
                    { x: 20, y: 15 },
                    { x: 70, y: 30 },
                    { x: 40, y: 50 },
                    { x: 80, y: 70 },
                    { x: 30, y: 85 },
                    { x: 60, y: 20 },
                    { x: 25, y: 40 },
                    { x: 75, y: 60 },
                    { x: 45, y: 80 },
                    { x: 15, y: 95 },
                  ];
                  return (
                    <Icon
                      key={i}
                      className="absolute text-brand-700"
                      style={{
                        left: `${positions[i].x}%`,
                        top: `${positions[i].y}%`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        width: '48px',
                        height: '48px'
                      }}
                    />
                  );
                })}
              </div>

              <div className="mb-8 relative z-10">
                <h1 className="text-2xl font-bold text-brand-700">
                  ESW Releases
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
              
              {/* Action Buttons Section */}
              <div className="mt-auto mb-4 relative z-10">
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-center text-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    onClick={handleAddRelease}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Release
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-center text-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    onClick={handleAddIncident}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Incident
                  </Button>
                </div>
                
                {/* Sign Out at the bottom */}
                <div className="mt-4">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center px-6 py-2.5 text-gray-700 rounded-full transition-all duration-300 transform hover:translate-x-1 hover:bg-brand-50/50 hover:text-brand-700"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </button>
                </div>
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
