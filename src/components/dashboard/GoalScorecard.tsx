
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Target, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GoalScorecardProps {
  stats: Array<{
    name: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }>;
}

export const GoalScorecard = ({ stats }: GoalScorecardProps) => {
  // Extract on track percentage for the pie chart
  const onTrackStat = stats.find(s => s.name === "On Track");
  const onTrackValue = onTrackStat ? parseInt(onTrackStat.value) : 0;
  const pieData = [
    { name: "On Track", value: onTrackValue },
    { name: "At Risk", value: 100 - onTrackValue }
  ];
  const COLORS = ["#22c55e", "#f59e0b"];

  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Goal Delivery Scorecard</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col justify-center items-center space-y-8 md:w-1/3">
          {/* On Track Score with Pie Chart */}
          <div className="flex flex-col items-center">
            <div className="relative h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={56}
                    outerRadius={72}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} strokeWidth={0} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-3xl font-bold text-gray-900">{stats[1]?.value}</span>
                <span className="text-sm text-gray-500 block">On Track</span>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span
                className={`flex items-center gap-1 text-sm ${
                  stats[1]?.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stats[1]?.change}
                {stats[1]?.trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>

          {/* Goal Stats */}
          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Target className="h-5 w-5 text-brand-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">{stats[0]?.name}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats[0]?.value}</span>
                <span
                  className={`flex items-center gap-1 text-sm ${
                    stats[0]?.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stats[0]?.change}
                  {stats[0]?.trend === "up" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </span>
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-sm text-gray-500 mb-1">{stats[2]?.name}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats[2]?.value}</span>
                <span
                  className={`flex items-center gap-1 text-sm ${
                    stats[2]?.trend === "up" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {stats[2]?.change}
                  {stats[2]?.trend === "up" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly tracking Stats */}
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 gap-4 h-full">
            <div className="bg-gray-50 p-6 rounded-lg h-full flex flex-col justify-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Goal Status Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">On Track Goals</span>
                  <span className="font-medium">{parseInt(stats[0]?.value) * parseInt(stats[1]?.value) / 100} of {stats[0]?.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: stats[1]?.value }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">At Risk Goals</span>
                  <span className="font-medium">{parseInt(stats[0]?.value) * parseInt(stats[2]?.value) / 100} of {stats[0]?.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: stats[2]?.value }}></div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Business Unit Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Financial Services</span>
                      <span className="text-sm font-medium">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Security</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Data Intelligence</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Core Services</span>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
