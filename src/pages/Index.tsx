
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Link, Calendar, Edit2 } from "lucide-react";
import { ReleasePanel } from "@/components/ReleasePanel";
import { useState } from "react";

// Type definitions
type Release = {
  id: number;
  businessUnit: string;
  product: string;
  releaseName: string;
  releaseDate: string;
  dri: string;
  releaseNotes: string;
  status: "Planned" | "Deployed";
  quality: "Good" | "Bad";
  description: string;
  incidents: number;
};

const activityFeed = [
  {
    id: 1,
    type: "release",
    title: "New Release Deployed",
    date: "Just now",
    product: "Payment Gateway",
    releaseName: "v2.1",
    businessUnit: "Financial Services",
    releaseDate: "2024-03-15",
    dri: "Jane Smith",
    releaseNotes: "https://example.com/releases/payment-gateway-v2-1",
    status: "Deployed" as const,
    quality: "Good" as const,
    description: "Major update to the payment processing system with improved security features.",
    incidents: 0
  },
  {
    id: 2,
    type: "incident",
    title: "Authentication Service Degradation",
    date: "2 hours ago",
    product: "User Authentication",
    releaseName: "v1.5",
    businessUnit: "Security",
    releaseDate: "2024-03-10",
    dri: "John Doe",
    releaseNotes: "https://example.com/releases/auth-service-v1-5",
    status: "Deployed" as const,
    quality: "Bad" as const,
    description: "Enhanced two-factor authentication implementation.",
    incidents: 2
  },
  {
    id: 3,
    type: "release",
    title: "Analytics Dashboard Update",
    date: "5 hours ago",
    product: "Analytics Dashboard",
    releaseName: "v3.0",
    businessUnit: "Data Intelligence",
    releaseDate: "2024-03-05",
    dri: "Alice Johnson",
    releaseNotes: "https://example.com/releases/analytics-v3-0",
    status: "Deployed" as const,
    quality: "Good" as const,
    description: "Complete redesign of the analytics dashboard with new metrics.",
    incidents: 0
  }
];

const Index = () => {
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const handleClick = (activity: typeof activityFeed[0]) => {
    // For both releases and incidents, we'll show the associated release details
    setSelectedRelease({
      id: activity.id,
      businessUnit: activity.businessUnit,
      product: activity.product,
      releaseName: activity.releaseName,
      releaseDate: activity.releaseDate,
      dri: activity.dri,
      releaseNotes: activity.releaseNotes,
      status: activity.status,
      quality: activity.quality,
      description: activity.description,
      incidents: activity.incidents
    });
  };

  return (
    <DashboardLayout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activityFeed.map((activity) => (
          <Card key={activity.id} className="cursor-pointer" onClick={() => handleClick(activity)}>
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
              <CardDescription>{activity.date}</CardDescription>
            </CardHeader>
            <CardContent>
              {activity.type === "release" ? (
                <>
                  <Badge>{activity.product}</Badge>
                  <p className="text-sm text-gray-500 mt-2">{activity.description}</p>
                </>
              ) : (
                <Badge variant="destructive">Incident</Badge>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                activity.quality === "Good"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {activity.quality === "Good" && <Check className="h-3 w-3" />}
                {activity.quality}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ReleasePanel
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
        businessUnits={activityFeed.map(item => item.businessUnit)}
        products={activityFeed.map(item => item.product)}
      />
    </DashboardLayout>
  );
};

export default Index;
