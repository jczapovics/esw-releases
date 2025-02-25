
import { Check, FileText } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface Release {
  id: number;
  businessUnit: string;
  product: string;
  releaseName: string;
  releaseDate: string;
  dri: string;
  releaseNotes: string;
  status: "Deployed" | "Planned";
  quality: "Good" | "Bad";
  description: string;
  incidents: number;
}

interface ReleasesTableProps {
  releases: Release[];
  onReleaseClick: (release: Release) => void;
}

export function ReleasesTable({ releases, onReleaseClick }: ReleasesTableProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Releases</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Unit</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Release Name</TableHead>
            <TableHead>DRI</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead>Release Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((release) => (
            <TableRow 
              key={release.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onReleaseClick(release)}
            >
              <TableCell>{release.businessUnit}</TableCell>
              <TableCell>{release.product}</TableCell>
              <TableCell>{release.releaseName}</TableCell>
              <TableCell>{release.dri}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  release.status === "Deployed" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {release.status === "Deployed" && <Check className="h-3 w-3" />}
                  {release.status}
                </span>
              </TableCell>
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
              <TableCell>
                <a
                  href={release.releaseNotes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileText className="h-4 w-4" />
                  View
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
