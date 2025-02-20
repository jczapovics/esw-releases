import React, { useState } from "react";
import { format } from "date-fns";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReleasePanel } from "@/components/ReleasePanel";

// Using the same Release type from Releases page
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

// Mock releases data - keeping the same as Releases page for consistency
const releases: Release[] = [
  {
    id: 1,
    businessUnit: "Financial Services",
    product: "Payment Gateway",
    releaseName: "v2.1",
    releaseDate: "2024-03-15",
    dri: "Jane Smith",
    releaseNotes: "https://example.com/releases/payment-gateway-v2-1",
    status: "Deployed",
    quality: "Good",
    description: "Major update to the payment processing system with improved security features.",
    incidents: 0
  },
  {
    id: 2,
    businessUnit: "Security",
    product: "User Authentication",
    releaseName: "v1.5",
    releaseDate: "2024-03-10",
    dri: "John Doe",
    releaseNotes: "https://example.com/releases/auth-service-v1-5",
    status: "Deployed",
    quality: "Bad",
    description: "Enhanced two-factor authentication implementation.",
    incidents: 2
  },
  {
    id: 3,
    businessUnit: "Data Intelligence",
    product: "Analytics Dashboard",
    releaseName: "v3.0",
    releaseDate: "2024-03-05",
    dri: "Alice Johnson",
    releaseNotes: "https://example.com/releases/analytics-v3-0",
    status: "Deployed",
    quality: "Good",
    description: "Complete redesign of the analytics dashboard with new metrics.",
    incidents: 0
  }
];

const businessUnits = ["Financial Services", "Security", "Data Intelligence", "Core Services"];
const products = ["Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

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

const Incidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState<Incident | null>(null);

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

  const handleReleaseClick = (releaseId: string) => {
    const release = releases.find(r => r.id === Number(releaseId));
    if (release) {
      setSelectedRelease(release);
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

      <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Incidents</h1>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date Reported</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Linked Release</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>{incident.name}</TableCell>
                  <TableCell>{format(incident.dateReported, "MMM d, yyyy")}</TableCell>
                  <TableCell className="max-w-md">
                    <span className="truncate block">{incident.description}</span>
                  </TableCell>
                  <TableCell>
                    <a
                      href={incident.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-500 hover:text-brand-600 inline-flex items-center gap-1"
                    >
                      View Doc
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
          businessUnits={businessUnits}
          products={products}
        />
      </div>
    </DashboardLayout>
  );
};

export default Incidents;
