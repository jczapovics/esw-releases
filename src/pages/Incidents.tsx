
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
      id: "REL-123",
      name: "Payment Gateway v2.1.0",
    },
  },
  {
    id: "INC-002",
    name: "Authentication Service Outage",
    dateReported: new Date("2024-03-14"),
    description: "Complete authentication service downtime for 15 minutes",
    documentLink: "https://docs.google.com/doc/auth-incident-002",
    linkedRelease: {
      id: "REL-124",
      name: "Auth Service v1.5.0",
    },
  },
  {
    id: "INC-003",
    name: "Data Sync Delay",
    dateReported: new Date("2024-03-13"),
    description: "Analytics dashboard showing delayed data updates",
    documentLink: "https://docs.google.com/doc/analytics-incident-003",
    linkedRelease: {
      id: "REL-125",
      name: "Analytics Dashboard v3.0.1",
    },
  },
];

const Incidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Incident>>({});
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
                    <span className="text-brand-500">
                      {incident.linkedRelease.name}
                    </span>
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
      </div>
    </DashboardLayout>
  );
};

export default Incidents;
