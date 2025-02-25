
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface StatsSummaryProps {
  stats: Array<{
    name: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }>;
}

export const StatsSummary = ({ stats }: StatsSummaryProps) => {
  // Convert quality percentage to pie chart data
  const qualityStat = stats.find(s => s.name === "High Quality");
  const qualityValue = qualityStat ? parseInt(qualityStat.value) : 0;
  const pieData = [
    { name: "Quality", value: qualityValue },
    { name: "Remaining", value: 100 - qualityValue }
  ];
  const COLORS = ["#22c55e", "#f3f4f6"];

  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <div>
            <p className="text-sm text-gray-500">{stats[0].name}</p>
            <div className="flex items-center mt-1">
              <span className="text-3xl font-semibold text-gray-900">{stats[0].value}</span>
              <span
                className={`ml-2 flex items-center text-sm ${
                  stats[0].trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stats[0].change}
                {stats[0].trend === "up" ? (
                  <ArrowUp className="ml-1 h-4 w-4" />
                ) : (
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-[100px] w-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={35}
                    outerRadius={45}
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
            </div>
            <div>
              <p className="text-sm text-gray-500">{stats[1].name}</p>
              <div className="flex items-center mt-1">
                <span className="text-3xl font-semibold text-gray-900">{stats[1].value}</span>
                <span
                  className={`ml-2 flex items-center text-sm ${
                    stats[1].trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stats[1].change}
                  {stats[1].trend === "up" ? (
                    <ArrowUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
