
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { useRef } from "react";

interface QualityTrendProps {
  monthlyQualityTrend: Array<{
    month: string;
    quality: number;
    releases: number;
  }>;
}

export const QualityTrend = ({ monthlyQualityTrend }: QualityTrendProps) => {
  const trendCardRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1" ref={trendCardRef}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Trend</h2>
      </div>
      <div className="space-y-4">
        <div className="mt-6">
          <div className="chart-container h-[300px] w-full">
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
      </div>
    </Card>
  );
};
