
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from "recharts";

interface ReleaseScorecardProps {
  stats: Array<{
    name: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }>;
  monthlyQualityTrend: Array<{
    month: string;
    quality: number;
    releases: number;
  }>;
}

export const ReleaseScorecard = ({ stats, monthlyQualityTrend }: ReleaseScorecardProps) => {
  // Convert quality percentage to pie chart data
  const qualityStat = stats.find(s => s.name === "High Quality");
  const qualityValue = qualityStat ? parseInt(qualityStat.value) : 0;
  const pieData = [
    { name: "Quality", value: qualityValue },
    { name: "Remaining", value: 100 - qualityValue }
  ];
  const COLORS = ["#22c55e", "#ea384c"];

  return (
    <Card className="p-8 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Release Scorecard</h2>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-8 w-1/3">
          <div className="flex flex-col items-center">
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
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">{stats[1].name}</p>
              <div className="flex items-center justify-center mt-1">
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

          <div className="text-center">
            <p className="text-sm text-gray-500">{stats[0].name}</p>
            <div className="flex items-center justify-center mt-1">
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
        </div>

        <div className="flex-1 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyQualityTrend}>
              <XAxis 
                dataKey="month" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[80, 100]}
                ticks={[80, 85, 90, 95, 100]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 25]}
                ticks={[0, 5, 10, 15, 20, 25]}
              />
              <RechartsTooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="quality" 
                stroke="#14b8a6" 
                strokeWidth={2}
                dot={{ fill: '#14b8a6', strokeWidth: 2 }}
                name="Quality Score"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="releases" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 2 }}
                name="Number of Releases"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
