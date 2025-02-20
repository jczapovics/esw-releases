import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Copy, HelpCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toPng } from 'html-to-image';
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Period = "month" | "quarter" | "year";

const getStatsForPeriod = (period: Period) => {
  switch (period) {
    case "month":
      return [
        {
          name: "Total Releases",
          value: "12",
          change: "+3",
          trend: "up",
        },
        {
          name: "High Quality",
          value: "92%",
          change: "+4%",
          trend: "up",
        },
      ];
    case "quarter":
      return [
        {
          name: "Total Releases",
          value: "45",
          change: "+8",
          trend: "up",
        },
        {
          name: "High Quality",
          value: "88%",
          change: "+2%",
          trend: "up",
        },
      ];
    case "year":
      return [
        {
          name: "Total Releases",
          value: "156",
          change: "+12%",
          trend: "up",
        },
        {
          name: "High Quality",
          value: "90%",
          change: "+5%",
          trend: "up",
        },
      ];
  }
};

const activityFeed = [
  {
    id: 1,
    title: "New Release",
    product: "Payment Gateway",
    releaseName: "Summer Release 2024",
    description: "Major version release with new features",
    date: "2h ago",
    type: "release",
  },
  {
    id: 2,
    title: "New Incident",
    product: "User Authentication",
    releaseName: "Auth Service v1.5",
    description: "API Performance Degradation",
    date: "4h ago",
    type: "incident",
  },
  {
    id: 3,
    title: "New Release",
    product: "Analytics Dashboard",
    releaseName: "Hotfix v1.9.1",
    description: "Hotfix v1.9.1 deployed successfully",
    date: "1d ago",
    type: "release",
  },
  {
    id: 4,
    title: "New Release",
    product: "User Management",
    releaseName: "v2.1.0",
    description: "User roles and permissions update",
    date: "2d ago",
    type: "release",
  },
  {
    id: 5,
    title: "New Incident",
    product: "Search Service",
    releaseName: "Search v1.2",
    description: "Search latency increased",
    date: "3d ago",
    type: "incident",
  },
];

const ITEMS_PER_PAGE = 3;

const monthlyQualityTrend = [
  { month: 'Jan', quality: 88 },
  { month: 'Feb', quality: 92 },
  { month: 'Mar', quality: 85 },
  { month: 'Apr', quality: 94 },
  { month: 'May', quality: 90 },
  { month: 'Jun', quality: 92 },
];

// Update type for product quality ranking
type ProductQuality = {
  product: string;
  qualityPercentage: number;
  incidents: number;
  trend: "up" | "down";
  change: string;
};

const getProductQualityForPeriod = (period: Period): ProductQuality[] => {
  switch (period) {
    case "month":
      return [
        { product: "Payment Gateway", qualityPercentage: 85, incidents: 3, trend: "down", change: "-5%" },
        { product: "User Authentication", qualityPercentage: 88, incidents: 2, trend: "down", change: "-3%" },
        { product: "Analytics Dashboard", qualityPercentage: 92, incidents: 1, trend: "up", change: "+2%" },
        { product: "Search Service", qualityPercentage: 95, incidents: 0, trend: "up", change: "+4%" },
      ];
    case "quarter":
      return [
        { product: "Payment Gateway", qualityPercentage: 82, incidents: 8, trend: "down", change: "-8%" },
        { product: "User Authentication", qualityPercentage: 86, incidents: 5, trend: "down", change: "-4%" },
        { product: "Search Service", qualityPercentage: 90, incidents: 3, trend: "up", change: "+3%" },
        { product: "Analytics Dashboard", qualityPercentage: 93, incidents: 2, trend: "up", change: "+5%" },
      ];
    case "year":
      return [
        { product: "Payment Gateway", qualityPercentage: 80, incidents: 24, trend: "down", change: "-10%" },
        { product: "User Authentication", qualityPercentage: 84, incidents: 15, trend: "down", change: "-6%" },
        { product: "Search Service", qualityPercentage: 88, incidents: 10, trend: "up", change: "+4%" },
        { product: "Analytics Dashboard", qualityPercentage: 92, incidents: 8, trend: "up", change: "+6%" },
      ];
  }
};

const Index = () => {
  const [period, setPeriod] = useState<Period>("month");
  const [currentPage, setCurrentPage] = useState(1);
  const stats = getStatsForPeriod(period);
  const qualityCardRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(activityFeed.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivity = activityFeed.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCopyAsImage = async () => {
    if (qualityCardRef.current) {
      try {
        const dataUrl = await toPng(qualityCardRef.current, { quality: 1.0 });
        const link = document.createElement('a');
        link.download = 'release-quality.png';
        link.href = dataUrl;
        link.click();
        toast.success("Quality report downloaded as image");
      } catch (err) {
        toast.error("Failed to download image");
        console.error(err);
      }
    }
  };

  const productQualityRanking = getProductQualityForPeriod(period);

  return (
    <DashboardLayout>
      <div className="animate-fadeIn">
        <div className="mb-6 flex justify-end space-x-2">
          <Button
            variant={period === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("month")}
          >
            This Month
          </Button>
          <Button
            variant={period === "quarter" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("quarter")}
          >
            This Quarter
          </Button>
          <Button
            variant={period === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("year")}
          >
            This Year
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6" ref={qualityCardRef}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Release Quality</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAsImage}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Save as Image
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>This Year</span>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Product Quality Ranking</h2>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-4">
              {productQualityRanking.map((product, index) => (
                <div
                  key={product.product}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{product.product}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          product.qualityPercentage >= 90 
                            ? "bg-green-100 text-green-800"
                            : product.qualityPercentage >= 85
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {product.qualityPercentage}% Quality
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.incidents} incidents
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    product.trend === "up" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {product.trend === "up" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span className="text-sm">{product.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {paginatedActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 animate-slideIn p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    activity.type === "release"
                      ? "bg-brand-500"
                      : "bg-red-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <p className="text-xs text-brand-600 mt-1">
                    {activity.product} • {activity.releaseName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
