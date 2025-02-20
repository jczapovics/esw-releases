
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Incident>>({});
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState<Incident | null>(null);
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

  const handleDelete = (incident: Incident) => {
    setIncidentToDelete(incident);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (incidentToDelete) {
      setIncidents(incidents.filter(inc => inc.id !== incidentToDelete.id));
      toast({
        title: "Success",
        description: "Incident deleted successfully",
      });
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

      <div className="animate-fadeIn space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Incidents</h1>
        </div>

        <Card className="overflow-hidden border-none shadow-md bg-white/50 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">ID</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Name</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Date Reported</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Description</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Document</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Linked Release</TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow 
                  key={incident.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
                >
                  <TableCell className="font-medium text-sm text-gray-900">{incident.id}</TableCell>
                  <TableCell>
                    {editingId === incident.id ? (
                      <Input
                        value={editData.name || ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="max-w-[200px]"
                      />
                    ) : (
                      <span className="text-sm text-gray-700">{incident.name}</span>
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
                      <span className="text-sm text-gray-600">{format(incident.dateReported, "MMM d, yyyy")}</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-md">
                    {editingId === incident.id ? (
                      <Input
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      />
                    ) : (
                      <span className="text-sm text-gray-600 truncate block">{incident.description}</span>
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
                        className="text-brand-500 hover:text-brand-600 inline-flex items-center gap-1 text-sm font-medium"
                      >
                        View Doc
                        <ExternalLink className="h-3.5 w-3.5" />
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
                        className="text-brand-500 hover:text-brand-600 text-sm font-medium"
                      >
                        {incident.linkedRelease.name}
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {editingId === incident.id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveEdit(incident.id)}
                            className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(incident)}
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <Pencil className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(incident)}
                            className="h-8 w-8 p-0 hover:bg-red-50"
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
