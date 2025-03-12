
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from "recharts";

interface GoalScorecardProps {
  stats: Array<{
    name: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }>;
  weeklyGoalData: Array<{
    week: string;
    onTrack: number;
    total: number;
    percentage: number;
  }>;
}

export const GoalScorecard = ({ stats, weeklyGoalData }: GoalScorecardProps) => {
  // Convert quality percentage to pie chart data
  const onTrackStat = stats.find(s => s.name === "On Track");
  const onTrackValue = onTrackStat ? parseInt(onTrackStat.value) : 0;
  const pieData = [
    { name: "On Track", value: onTrackValue },
    { name: "Remaining", value: 100 - onTrackValue }
  ];
  const COLORS = ["#22c55e", "#ea384c"];

  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Goal Scorecard</h2>
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
                <span className="text-3xl font-bold text-gray-900">{stats[1].value}</span>
                <span className="text-sm text-gray-500 block">On Track</span>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span
                className={`flex items-center gap-1 text-sm ${
                  stats[1].trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stats[1].change}
                {stats[1].trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>

          {/* Goals On Track Counter */}
          <div className="text-center p-4 bg-gray-50 rounded-lg w-full">
            <p className="text-sm text-gray-500 mb-1">Goals On Track</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-gray-900">{stats[0].value}</span>
              <span
                className={`flex items-center gap-1 text-sm ${
                  stats[0].trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stats[0].change}
                {stats[0].trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="md:w-2/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyGoalData}>
              <XAxis 
                dataKey="week" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, dataMax => Math.max(25, Math.ceil(dataMax * 1.1))]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <RechartsTooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="total" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 2 }}
                name="Total Goals"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="onTrack" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                name="On Track Goals"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="percentage" 
                stroke="#14b8a6" 
                strokeWidth={2}
                dot={{ fill: '#14b8a6', strokeWidth: 2 }}
                name="On Track Percentage"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

