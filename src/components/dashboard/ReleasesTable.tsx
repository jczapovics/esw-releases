
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { TablePagination } from "./TablePagination";

interface Release {
  id: number;
  businessUnit: string;
  product: string;
  releaseDate: string;
  quality: "Good" | "Bad";
}

interface ReleasesTableProps {
  releases: Release[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReleaseClick: (release: Release) => void;
}

export const ReleasesTable = ({
  releases,
  currentPage,
  totalPages,
  onPageChange,
  onReleaseClick,
}: ReleasesTableProps) => {
  return (
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
              className="cursor-pointer transition-colors hover:bg-gray-50/80"
              onClick={() => onReleaseClick(release)}
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
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Card>
  );
};
