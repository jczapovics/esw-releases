<lov-code>
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Check, ExternalLink, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ReleasePanel } from "@/components/ReleasePanel";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

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

// Add new type for incidents
type Incident = {
  id: string;
  name: string;
  dateReported: Date;
  description: string;
  documentLink: string;
  linkedRelease: {
    id: string;
    name: string;
  };
};

// Add mock incidents data
const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    name: "API Performance Degradation",
    dateReported: new Date("2024-03-15"),
    description: "Users experiencing slow response times in the payment gateway",
    documentLink: "https://docs.google.com/doc/payment-incident-001",
    linkedRelease: {
      id: "1",
      name: "Payment Gateway v2.1",
    },
  },
  {
    id: "INC-002",
    name: "Authentication Service Outage",
    dateReported: new Date("2024-03-14"),
    description: "Complete authentication service downtime for 15 minutes",
    documentLink: "https://docs.google.com/doc/auth-incident-002",
    linkedRelease: {
      id: "2",
      name: "User Authentication v1.5",
    },
  },
  {
    id: "INC-003",
    name: "Data Sync Delay",
    dateReported: new Date("2024-03-13"),
    description: "Analytics dashboard showing delayed data updates",
    documentLink: "https://docs.google.com/doc/analytics-incident-003",
    linkedRelease: {
      id: "3",
      name: "Analytics Dashboard v3.0",
    },
  },
];

const Index = () => {
  const [period, setPeriod] = useState<Period>("month");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const stats = getStatsForPeriod(period);
  const qualityCardRef = useRef<HTMLDivElement>(null);
  const [selectedRelease, setSelectedRelease] = useState<typeof releases[0] | null>(null);

  const totalPages = Math.ceil(activityFeed.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivity = activityFeed.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const productQualityRanking = getProductQualityForPeriod(period);
  const activeProducts = getActiveProductsForPeriod(period);

  const handleReleaseClick = (activity: typeof activityFeed[0]) => {
    const release = releases.find(r => 
      r.product === activity.product && 
      r.releaseName === activity.releaseName
    );
    if (release) {
      setSelectedRelease(release);
    }
  };

  const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
  const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState<Incident | null>(null);

  // Add incident management functions
  const handleUpdateRelease = (incidentId: string, releaseId: string) => {
    const release = releases.find(r => String(r.id) === releaseId);
    if (release) {
      setIncidents(incidents.map(inc => 
        inc.id === incidentId 
          ? { 
              ...inc, 
              linkedRelease: {
                id: String(release.id),
                name: `${release.product} ${release.releaseName}`
              }
            }
          : inc
      ));
      toast("Incident linked to release successfully");
    }
  };

  const handleDelete = (incident: Incident) => {
    setIncidentToDelete(incident);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (incidentToDelete) {
      setIncidents(incidents.filter(inc => inc.id !== incidentToDelete.id));
      toast("Incident deleted successfully");
      setDeleteDialogOpen(false);
      setIncidentToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the incident
              "{incidentToDelete?.name}" and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Incident
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="animate-fadeIn space-y-8">
        {/* New Filters Card */}
        <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Time Period</span>
                <div className="flex space-x-2">
                  <Button
                    variant={period === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod("month")}
                  >
                    Month
                  </Button>
                  <Button
                    variant={period === "quarter" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod("quarter")}
                  >
                    Quarter
                  </Button>
                  <Button
                    variant={period === "year" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod("year")}
                  >
                    Year
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Business Unit</span>
                <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Business Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessUnits.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Product</span>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Quality Card - removed filters */}
        <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1" ref={qualityCardRef}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Release Scorecard</h2>
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

        {/* Stats Card - removed period selector */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

          <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
        </div>

        <Card className="p-6 w-full shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

        {/* Add the releases table at the bottom */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Releases</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Unit</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Quality</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releases.map((release) => (
                <TableRow 
                  key={release.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedRelease(release)}
                >
                  <TableCell>{release.businessUnit}</TableCell>
                  <TableCell>{release.product}</TableCell>
                  <TableCell>{new Date(release.releaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      release.quality === "Good" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {release.quality === "Good" && <Check className="h-3 w-3" />}
                      {release.quality}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Add Incidents table */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Incidents</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] whitespace-nowrap">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-[120px] whitespace-nowrap">Date Reported</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead className="w-[80px]">Document</TableHead>
                <TableHead className="w-[200px]">Linked Release</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium whitespace-nowrap">{incident.id}</TableCell>
                  <TableCell>{incident.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{format(incident.dateReported, "MMM d, yyyy")}</TableCell>
                  <TableCell className="max-w-[300px]">
                    <span className="truncate block">{incident.description}</span>
                  </TableCell>
                  <TableCell>
                    <a
                      href={incident.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-500 hover:text-brand-600 inline-flex items-center"
                      title="View document"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={incident.linkedRelease.id}
                      onValueChange={(value) => handleUpdateRelease(incident.id, value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Release" />
                      </SelectTrigger>
                      <SelectContent>
                        {releases.map((release) => (
                          <SelectItem key={release.id} value={String(release.id)}>
                            {release.product} {release.releaseName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(incident)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <ReleasePanel 
          release={selectedRelease}
          onClose={() => setSelectedRelease(null)}
          businessUnits={businessUnits.filter(bu => bu !== "All")}
          products={products.
