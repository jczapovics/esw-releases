
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, Calendar, Check } from "lucide-react";

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

export const ReleasePanel = ({ release, onClose }: ReleasePanelProps) => {
  if (!release) {
    return null;
  }

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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
