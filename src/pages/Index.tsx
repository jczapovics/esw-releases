import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  {
    name: "Total Releases",
    value: "156",
    change: "+12%",
    trend: "up",
  },
  {
    name: "High Quality",
    value: "92%",
    change: "+4%",
    trend: "up",
  },
  {
    name: "Active Incidents",
    value: "3",
    change: "-2",
    trend: "down",
  },
];

const activityFeed = [
  {
    id: 1,
    title: "New Release: v2.0.0",
    description: "Major version release with new features",
    date: "2h ago",
    type: "release",
  },
  {
    id: 2,
    title: "Incident Reported",
    description: "API Performance Degradation",
    date: "4h ago",
    type: "incident",
  },
  {
    id: 3,
    title: "Release Deployed",
    description: "Hotfix v1.9.1 deployed successfully",
    date: "1d ago",
    type: "release",
  },
];

const monthlyQualityTrend = [
  { month: 'Jan', quality: 88 },
  { month: 'Feb', quality: 92 },
  { month: 'Mar', quality: 85 },
  { month: 'Apr', quality: 94 },
  { month: 'May', quality: 90 },
  { month: 'Jun', quality: 92 },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.name} className="p-6 card-hover">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  )}
                </span>
              </div>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Release Quality</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Overall Quality</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>This Quarter</span>
                  <span className="font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>This Month</span>
                  <span className="font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Monthly Quality Trend</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyQualityTrend}>
                      <XAxis 
                        dataKey="month" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[80, 100]}
                        ticks={[80, 85, 90, 95, 100]}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="quality" 
                        stroke="#14b8a6" 
                        strokeWidth={2}
                        dot={{ fill: '#14b8a6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 animate-slideIn"
                >
                  <div
                    className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      activity.type === "release"
                        ? "bg-brand-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
