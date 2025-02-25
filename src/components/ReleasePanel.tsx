import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, Calendar, Check, AlertCircle, FileText } from "lucide-react";

type Incident = {
  id: number;
  title: string;
  description: string;
  status: "Open" | "Resolved";
  dateReported: string;
  documentLink?: string;
};

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

interface ReleasePanelProps {
  release: Release | null;
  onClose: () => void;
  businessUnits?: string[];
  products?: string[];
}

// Updated mock incidents data to include document links
const mockIncidents: Record<number, Incident[]> = {
  1: [],
  2: [
    {
      id: 1,
      title: "API Performance Degradation",
      description: "Users experiencing slow response times",
      status: "Resolved",
      dateReported: "2024-03-10",
      documentLink: "https://docs.example.com/incidents/api-degradation"
    },
    {
      id: 2,
      title: "Authentication Issues",
      description: "Intermittent login failures",
      status: "Resolved",
      dateReported: "2024-03-11",
      documentLink: "https://docs.example.com/incidents/auth-issues"
    }
  ],
  3: []
};

export const ReleasePanel = ({ release, onClose }: ReleasePanelProps) => {
  if (!release) {
    return null;
  }

  const relatedIncidents = mockIncidents[release.id] || [];

  return (
    <Sheet open={!!release} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Release Details</SheetTitle>
          <SheetDescription>
            View release information
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            {/* Business Unit */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Business Unit</label>
              <p className="text-sm text-gray-900">{release.businessUnit}</p>
            </div>

            {/* Product */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Product</label>
              <p className="text-sm text-gray-900">{release.product}</p>
            </div>

            {/* Release Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Release Name/Version</label>
              <p className="text-sm text-gray-900">{release.releaseName}</p>
            </div>

            {/* Release Date */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Release Date</label>
              <p className="text-sm text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(release.releaseDate).toLocaleDateString()}
              </p>
            </div>

            {/* DRI */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">DRI (Owner)</label>
              <p className="text-sm text-gray-900">{release.dri}</p>
            </div>

            {/* Release Notes */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Release Notes</label>
              <div className="pt-1">
                <a 
                  href={release.releaseNotes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
                >
                  <Link className="h-4 w-4" />
                  View Notes
                </a>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Status</label>
              <p className="text-sm text-gray-900">{release.status}</p>
            </div>

            {/* Quality */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Quality</label>
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  release.quality === "Good" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {release.quality === "Good" && <Check className="h-3 w-3" />}
                  {release.quality}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {release.incidents} incident(s) reported
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
              <p className="text-sm text-gray-900">{release.description}</p>
            </div>

            {/* Related Incidents */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Related Incidents</label>
              {relatedIncidents.length > 0 ? (
                <div className="mt-2 space-y-3">
                  {relatedIncidents.map((incident) => (
                    <div 
                      key={incident.id}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-gray-900">{incident.title}</h4>
                              {incident.documentLink && (
                                <a
                                  href={incident.documentLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                  title="View incident document"
                                >
                                  <FileText className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{incident.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                incident.status === "Resolved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}>
                                {incident.status}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(incident.dateReported).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-1">No incidents reported for this release</p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
