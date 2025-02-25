
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, eachDayOfInterval, subDays, startOfDay } from "date-fns";

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

type DailyData = {
  date: Date;
  quality: number;
  releases: number;
}

export const ReleaseScorecard = ({ stats, monthlyQualityTrend }: ReleaseScorecardProps) => {
  // Generate last 90 days of mock data
  const generateDailyData = (): DailyData[] => {
    const today = startOfDay(new Date());
    const days = eachDayOfInterval({
      start: subDays(today, 89),
      end: today
    });

    return days.map(date => {
      // Generate random but sensible data
      const quality = Math.floor(Math.random() * 20) + 80; // 80-100
      const releases = Math.floor(Math.random() * 5); // 0-4 releases per day
      return { date, quality, releases };
    });
  };

  const dailyData = generateDailyData();

  const getQualityColor = (quality: number): string => {
    if (quality >= 90) return "#22c55e"; // High quality - green
    if (quality >= 85) return "#F97316"; // Medium quality - orange
    return "#ea384c"; // Low quality - red
  };

  const getDotSize = (releases: number): string => {
    if (releases === 0) return "w-0 h-0";
    if (releases === 1) return "w-1 h-1";
    if (releases === 2) return "w-1.5 h-1.5";
    if (releases === 3) return "w-2 h-2";
    return "w-2.5 h-2.5";
  };

  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Release Quality Calendar</h2>
          <p className="text-sm text-gray-500 mt-1">Last 90 days of release activity</p>
        </div>
        <div className="flex items-center gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-right">
              <p className="text-sm text-gray-500">{stat.name}</p>
              <div className="flex items-center justify-end mt-1">
                <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                <span
                  className={`ml-2 flex items-center text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-13 gap-1">
        {/* Days of week header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="h-8 flex items-center justify-center">
            <span className="text-xs text-gray-500">{day}</span>
          </div>
        ))}

        {/* Calendar cells */}
        {dailyData.map((data, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="aspect-square relative flex items-center justify-center rounded-sm transition-transform hover:scale-105"
                  style={{ 
                    backgroundColor: getQualityColor(data.quality),
                    opacity: data.releases > 0 ? 0.2 + (data.quality - 80) / 100 : 0.1
                  }}
                >
                  {data.releases > 0 && (
                    <div 
                      className={`rounded-full bg-gray-900 ${getDotSize(data.releases)}`}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <p className="font-semibold">{format(data.date, 'MMM d, yyyy')}</p>
                  <p>Quality Score: {data.quality}%</p>
                  <p>Releases: {data.releases}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#22c55e", opacity: 0.8 }} />
            <span className="text-xs text-gray-500">High Quality (90%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#F97316", opacity: 0.8 }} />
            <span className="text-xs text-gray-500">Medium Quality (85-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#ea384c", opacity: 0.8 }} />
            <span className="text-xs text-gray-500">Low Quality (&lt;85%)</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">Release count:</span>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-900" />
            <span className="text-xs text-gray-500">1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900" />
            <span className="text-xs text-gray-500">2-3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
            <span className="text-xs text-gray-500">4+</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
