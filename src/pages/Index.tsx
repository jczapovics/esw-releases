import { DashboardLayout } from "@/components/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="animate-fadeIn">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Releases</h3>
            </div>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Active Incidents</h3>
            </div>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Success Rate</h3>
            </div>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Recent Releases</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">Frontend v2.1.0</p>
                  <p className="text-xs text-muted-foreground">Deployed 2 hours ago</p>
                </div>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">Success</span>
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">Backend v1.8.0</p>
                  <p className="text-xs text-muted-foreground">Deployed 1 day ago</p>
                </div>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">Success</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Active Incidents</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">API Performance Degradation</p>
                  <p className="text-xs text-muted-foreground">Started 30 minutes ago</p>
                </div>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700">Investigating</span>
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">Database Connectivity Issues</p>
                  <p className="text-xs text-muted-foreground">Started 1 hour ago</p>
                </div>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-50 text-red-700">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
