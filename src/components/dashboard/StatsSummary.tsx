
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatsSummaryProps {
  stats: Array<{
    name: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }>;
}

export const StatsSummary = ({ stats }: StatsSummaryProps) => {
  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-8">
          {stats.map((stat) => (
            <div key={stat.name}>
              <p className="text-sm text-gray-500">{stat.name}</p>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                <span
                  className={`ml-2 flex items-center text-sm ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
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
    </Card>
  );
};
