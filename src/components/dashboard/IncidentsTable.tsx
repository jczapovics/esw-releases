
import { Card } from "@/components/ui/card";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TablePagination } from "./TablePagination";
import { format } from "date-fns";

interface Incident {
  id: string;
  name: string;
  dateReported: Date;
  description: string;
  documentLink: string;
  linkedRelease: {
    id: string;
    name: string;
  };
}

interface Release {
  id: number;
  product: string;
  releaseName: string;
}

interface IncidentsTableProps {
  incidents: Incident[];
  releases: Release[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onUpdateRelease: (incidentId: string, releaseId: string) => void;
  onDelete: (incident: Incident) => void;
}

export const IncidentsTable = ({
  incidents,
  releases,
  currentPage,
  totalPages,
  onPageChange,
  onUpdateRelease,
  onDelete,
}: IncidentsTableProps) => {
  return (
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
            <TableRow 
              key={incident.id}
              className="transition-colors hover:bg-gray-50/80"
            >
              <TableCell className="font-medium whitespace-nowrap">{incident.id}</TableCell>
              <TableCell>{incident.name}</TableCell>
              <TableCell className="whitespace-nowrap">
                {format(incident.dateReported, "MMM d, yyyy")}
              </TableCell>
              <TableCell className="max-w-[300px]">
                <span className="truncate block">{incident.description}</span>
              </TableCell>
              <TableCell>
                <a
                  href={incident.documentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:text-brand-600 inline-flex items-center transition-colors"
                  title="View document"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </TableCell>
              <TableCell>
                <Select
                  value={incident.linkedRelease.id}
                  onValueChange={(value) => onUpdateRelease(incident.id, value)}
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
                    onClick={() => onDelete(incident)}
                    className="transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Card>
  );
};
