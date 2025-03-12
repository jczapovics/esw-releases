
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
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
      <div className="flex flex-col md:flex-row gap-8">
        {/* Quality/On Track Percentage Pie Chart */}
        <div className="flex flex-col items-center justify-center md:w-1/2">
          <div className="relative h-[200px] w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={72}
                  outerRadius={90}
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
              <span className="text-4xl font-bold text-gray-900">{onTrackValue}</span>
              <span className="text-sm text-gray-500 block">On Track %</span>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className={`flex items-center gap-1 text-sm ${stats[1]?.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {stats[1]?.change}
              {stats[1]?.trend === "up" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </span>
          </div>
        </div>

        {/* Goals Count */}
        <div className="flex flex-col justify-center items-center md:w-1/2">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Goals On Track</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-gray-900">{stats[0]?.value}</span>
              <span className={`flex items-center gap-1 text-sm ${stats[0]?.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stats[0]?.change}
                {stats[0]?.trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
