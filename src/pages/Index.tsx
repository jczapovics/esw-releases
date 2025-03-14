import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useRef } from "react";
import { toast } from "sonner";
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
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { ReleaseScorecard } from "@/components/dashboard/ReleaseScorecard";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Check, ExternalLink, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const getStatsForPeriod = (period: Period): Array<{
  name: string;
  value: string;
  change: string;
  trend: "up" | "down";
}> => {
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
          value: "92",
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
          value: "88",
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
          value: "90",
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

const getQualityForPeriod = (period: Period) => {
  switch (period) {
    case "month":
      return { value: 88, label: "This Month" };
    case "quarter":
      return { value: 90, label: "This Quarter" };
    case "year":
      return { value: 92, label: "This Year" };
  }
};

const Index = () => {
  const [period, setPeriod] = useState<Period>("month");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedRelease, setSelectedRelease] = useState<typeof releases[0] | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState<Incident | null>(null);

  const stats = getStatsForPeriod(period);
  const quality = getQualityForPeriod(period);

  const productQualityRanking = getProductQualityForPeriod(period);
  const activeProducts = getActiveProductsForPeriod(period);

  const handleReleaseClick = (release: typeof releases[0]) => {
    setSelectedRelease(release);
  };

  const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
  const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

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
        <GlobalFilters
          period={period}
          setPeriod={setPeriod}
          selectedBusinessUnit={selectedBusinessUnit}
          setSelectedBusinessUnit={setSelectedBusinessUnit}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          businessUnits={businessUnits}
          products={products}
        />

        <ReleaseScorecard 
          stats={stats} 
          monthlyQualityTrend={monthlyQualityTrend}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Product Quality Ranking</h2>
            </div>
            <div className="space-y-4">
              {productQualityRanking.map((product, index) => (
                <div
                  key={product.product}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-[slide-in-right_0.3s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium animate-float">
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
                      <ArrowUp className="h-4 w-4 animate-[bounce_1s_ease-in-out_infinite]" />
                    ) : (
                      <ArrowDown className="h-4 w-4 animate-[bounce_1s_ease-in-out_infinite]" />
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
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-[slide-in-right_0.3s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium animate-float">
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
                      <ArrowUp className="h-4 w-4 animate-[bounce_1s_ease-in-out_infinite]" />
                    ) : (
                      <ArrowDown className="h-4 w-4 animate-[bounce_1s_ease-in-out_infinite]" />
                    )}
                    <span className="text-sm">{product.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                  onClick={() => handleReleaseClick(release)}
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

        <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
          products={products.filter(p => p !== "All")}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
