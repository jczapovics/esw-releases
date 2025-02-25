
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ReleaseScorecardProps {
  stats: Array<{
    name: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }>;
}

export const ReleaseScorecard = ({ stats }: ReleaseScorecardProps) => {
  // Convert quality percentage to pie chart data
  const qualityStat = stats.find(s => s.name === "High Quality");
  const qualityValue = qualityStat ? parseInt(qualityStat.value) : 0;
  const pieData = [
    { name: "Quality", value: qualityValue },
    { name: "Remaining", value: 100 - qualityValue }
  ];
  const COLORS = ["#22c55e", "#ea384c"]; // Changed second color to red

  return (
    <Card className="p-8 shadow-lg transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm border-2 border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Release Scorecard</h2>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-16 items-center">
          <div>
            <p className="text-sm text-gray-500">{stats[0].name}</p>
            <div className="flex items-center mt-1">
              <span className="text-4xl font-semibold text-gray-900">{stats[0].value}</span>
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

          <div className="flex items-center gap-8">
            <div className="h-[120px] w-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={42}
                    outerRadius={54}
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
                <span className="text-4xl font-semibold text-gray-900">{stats[1].value}</span>
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
