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
import { ExternalLink, Pencil, Trash2, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Incident>>({});
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const { toast } = useToast();

  const handleEdit = (incident: Incident) => {
    setEditingId(incident.id);
    setEditData(incident);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSaveEdit = (id: string) => {
    setIncidents(incidents.map(inc => 
      inc.id === id 
        ? { ...inc, ...editData, dateReported: new Date(editData.dateReported || inc.dateReported) }
        : inc
    ));
    setEditingId(null);
    setEditData({});
    toast({
      title: "Success",
      description: "Incident updated successfully",
    });
  };

  const handleDelete = (id: string) => {
    setIncidents(incidents.filter(inc => inc.id !== id));
    toast({
      title: "Success",
      description: "Incident deleted successfully",
    });
  };

  const handleReleaseClick = (releaseId: string) => {
    const release = releases.find(r => r.id === Number(releaseId));
    if (release) {
      setSelectedRelease(release);
    }
  };

  return (
    <DashboardLayout>
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
                  <TableCell>
                    {editingId === incident.id ? (
                      <Input
                        value={editData.name || ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="max-w-[200px]"
                      />
                    ) : (
                      incident.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === incident.id ? (
                      <Input
                        type="date"
                        value={format(new Date(editData.dateReported || incident.dateReported), "yyyy-MM-dd")}
                        onChange={(e) => setEditData({ ...editData, dateReported: new Date(e.target.value) })}
                        className="max-w-[150px]"
                      />
                    ) : (
                      format(incident.dateReported, "MMM d, yyyy")
                    )}
                  </TableCell>
                  <TableCell className="max-w-md">
                    {editingId === incident.id ? (
                      <Input
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      />
                    ) : (
                      <span className="truncate block">{incident.description}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === incident.id ? (
                      <Input
                        value={editData.documentLink || ""}
                        onChange={(e) => setEditData({ ...editData, documentLink: e.target.value })}
                        className="max-w-[200px]"
                      />
                    ) : (
                      <a
                        href={incident.documentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-500 hover:text-brand-600 inline-flex items-center gap-1"
                      >
                        View Doc
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === incident.id ? (
                      <Select
                        value={editData.linkedRelease?.id || incident.linkedRelease.id}
                        onValueChange={(value) => {
                          const release = releases.find(r => String(r.id) === value);
                          if (release) {
                            setEditData({
                              ...editData,
                              linkedRelease: {
                                id: String(release.id),
                                name: `${release.product} ${release.releaseName}`
                              }
                            });
                          }
                        }}
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
                    ) : (
                      <button
                        onClick={() => handleReleaseClick(incident.linkedRelease.id)}
                        className="text-brand-500 hover:text-brand-600"
                      >
                        {incident.linkedRelease.name}
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {editingId === incident.id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveEdit(incident.id)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(incident)}
                          >
                            <Pencil className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(incident.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
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
