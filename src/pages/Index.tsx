import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Copy } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { ReleasePanel } from "@/components/ReleasePanel";

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
  { month: 'Jan', quality: 88, releases: 15 },
  { month: 'Feb', quality: 92, releases: 12 },
  { month: 'Mar', quality: 85, releases: 18 },
  { month: 'Apr', quality: 94, releases: 14 },
  { month: 'May', quality: 90, releases: 16 },
  { month: 'Jun', quality: 92, releases: 20 },
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
}

// Add type for active products
type ActiveProduct = {
  product: string;
  releases: number;
  change: string;
  trend: "up" | "down";
};

const getActiveProductsForPeriod = (period: Period): ActiveProduct[] => {
  switch (period) {
    case "month":
      return [
        { product: "Analytics Dashboard", releases: 8, change: "+3", trend: "up" },
        { product: "Payment Gateway", releases: 6, change: "+2", trend: "up" },
        { product: "User Authentication", releases: 4, change: "-1", trend: "down" },
        { product: "Search Service", releases: 3, change: "0", trend: "up" },
      ];
    case "quarter":
      return [
        { product: "Analytics Dashboard", releases: 24, change: "+8", trend: "up" },
        { product: "Payment Gateway", releases: 18, change: "+5", trend: "up" },
        { product: "Search Service", releases: 15, change: "+3", trend: "up" },
        { product: "User Authentication", releases: 12, change: "-2", trend: "down" },
      ];
    case "year":
      return [
        { product: "Analytics Dashboard", releases: 85, change: "+15", trend: "up" },
        { product: "Payment Gateway", releases: 76, change: "+12", trend: "up" },
        { product: "Search Service", releases: 65, change: "+8", trend: "up" },
        { product: "User Authentication", releases: 54, change: "-5", trend: "down" },
      ];
  }
}

// Update releases data to match activity feed
const releases = [
  {
    id: 1,
    businessUnit: "Financial Services",
    product: "Payment Gateway",
    releaseName: "Summer Release 2024",
    releaseDate: "2024-03-15",
    dri: "Jane Smith",
    releaseNotes: "https://example.com/releases/payment-gateway-summer-2024",
    status: "Deployed" as const,
    quality: "Good" as const,
    description: "Major version release with new features",
    incidents: 0
  },
  {
    id: 2,
    businessUnit: "Security",
    product: "User Authentication",
    releaseName: "Auth Service v1.5",
    releaseDate: "2024-03-10",
    dri: "John Doe",
    releaseNotes: "https://example.com/releases/auth-service-v1-5",
    status: "Deployed" as const,
    quality: "Bad" as const,
    description: "API Performance Degradation",
    incidents: 2
  },
  {
    id: 3,
    businessUnit: "Data Intelligence",
    product: "Analytics Dashboard",
    releaseName: "Hotfix v1.9.1",
    releaseDate: "2024-03-05",
    dri: "Alice Johnson",
    releaseNotes: "https://example.com/releases/analytics-hotfix-v1-9-1",
    status: "Deployed" as const,
    quality: "Good" as const,
    description: "Hotfix v1.9.1 deployed successfully",
    incidents: 0
  }
];

const Index = () => {
  const [period, setPeriod] = useState<Period>("month");
  const [currentPage, setCurrentPage] = useState(1);
  const stats = getStatsForPeriod(period);
  const qualityCardRef = useRef<HTMLDivElement>(null);
  const [selectedRelease, setSelectedRelease] = useState<typeof releases[0] | null>(null);

  const totalPages = Math.ceil(activityFeed.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivity = activityFeed.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCopyAsImage = async () => {
    if (qualityCardRef.current) {
      try {
        // Add a longer delay to ensure charts are fully rendered
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get all the content height including the chart
        const contentHeight = qualityCardRef.current.scrollHeight;
        
        const dataUrl = await toPng(qualityCardRef.current, { 
          quality: 1.0,
          height: contentHeight,
          width: qualityCardRef.current.offsetWidth,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
            height: `${contentHeight}px`,  // Explicitly set the height
          },
          filter: (node) => {
            // Explicitly include Recharts SVG elements
            if (
              node instanceof HTMLElement && 
              (node.classList?.contains('recharts-wrapper') ||
               node.classList?.contains('recharts-surface') ||
               node.tagName.toLowerCase() === 'svg')
            ) {
              return true;
            }
            return true;
          },
          cacheBust: true,
          pixelRatio: 2, // Increase resolution
        });

        // Create a temporary img element
        const img = document.createElement('img');
        img.src = dataUrl;
        
        // Create a canvas with higher resolution
        const canvas = document.createElement('canvas');
        canvas.width = qualityCardRef.current.offsetWidth * 2;
        canvas.height = contentHeight * 2;  // Use the full content height
        
        // Wait for the image to load
        img.onload = async () => {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Enable high-quality image scaling
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.scale(2, 2);
            ctx.drawImage(img, 0, 0);
            
            try {
              canvas.toBlob(async (blob) => {
                if (blob) {
                  toast.promise(
                    navigator.clipboard.write([
                      new ClipboardItem({
                        'image/png': blob
                      })
                    ]),
                    {
                      loading: 'Copying scorecard...',
                      success: 'Scorecard copied to clipboard',
                      error: 'Failed to copy to clipboard'
                    }
                  );
                }
              }, 'image/png', 1.0);
            } catch (err) {
              toast.error("Failed to copy to clipboard");
              console.error(err);
            }
          }
        };
      } catch (err) {
        toast.error("Failed to generate image");
        console.error(err);
      }
    }
  };

  const productQualityRanking = getProductQualityForPeriod(period);
  const activeProducts = getActiveProductsForPeriod(period);

  const handleReleaseClick = (activity: typeof activityFeed[0]) => {
    console.log("Clicking release:", activity); // Debug log
    const release = releases.find(r => 
      r.product === activity.product && 
      r.releaseName === activity.releaseName
    );
    console.log("Found release:", release); // Debug log
    if (release) {
      setSelectedRelease(release);
    }
  };

  const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
  const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

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
              <h2 className="text-lg font-semibold">Release Scorecard</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAsImage}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy as Image
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>This Month</span>
                  <span className="font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
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
                  <span>This Year</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Monthly Trend</h3>
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

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Product Quality Ranking</h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Most Active Products</h2>
            </div>
            <div className="space-y-4">
              {activeProducts.map((product, index) => (
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
                      <span className="text-xs text-gray-500">
                        {product.releases} releases
                      </span>
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
                    <button
                      onClick={() => handleReleaseClick(activity)}
                      className="text-xs text-brand-600 mt-1 hover:text-brand-700"
                    >
                      {activity.product} • {activity.releaseName}
                    </button>
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
              <ReleasePanel 
                release={selectedRelease}
                onClose={() => setSelectedRelease(null)}
                businessUnits={businessUnits.filter(bu => bu !== "All")}
                products={products.filter(p => p !== "All")}
              />
      </div>
    </DashboardLayout>
  );
};

export default Index;
