
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Edit2, Link, Calendar, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

export const ReleasePanel = ({ release, onClose, businessUnits = [], products = [] }: ReleasePanelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRelease, setEditedRelease] = useState<Release | null>(release);

  const handleSave = () => {
    // In a real app, this would make an API call to update the release
    console.log("Saving release:", editedRelease);
    setIsEditing(false);
  };

  return (
    <Sheet open={!!release} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        {release && editedRelease && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>Release Details</span>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </SheetTitle>
              <SheetDescription>
                View and edit release information
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                {/* Business Unit */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Business Unit</label>
                  {isEditing ? (
                    <Select
                      value={editedRelease.businessUnit}
                      onValueChange={(value) => 
                        setEditedRelease({...editedRelease, businessUnit: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Business Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessUnits.map((bu) => (
                          <SelectItem key={bu} value={bu}>
                            {bu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900">{release.businessUnit}</p>
                  )}
                </div>

                {/* Product */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Product</label>
                  {isEditing ? (
                    <Select
                      value={editedRelease.product}
                      onValueChange={(value) => 
                        setEditedRelease({...editedRelease, product: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product} value={product}>
                            {product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900">{release.product}</p>
                  )}
                </div>

                {/* Release Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Release Name/Version</label>
                  {isEditing ? (
                    <Input 
                      value={editedRelease.releaseName}
                      onChange={(e) => 
                        setEditedRelease({...editedRelease, releaseName: e.target.value})
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{release.releaseName}</p>
                  )}
                </div>

                {/* Release Date */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Release Date</label>
                  {isEditing ? (
                    <Input 
                      type="date"
                      value={editedRelease.releaseDate}
                      onChange={(e) => 
                        setEditedRelease({...editedRelease, releaseDate: e.target.value})
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(release.releaseDate).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* DRI */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">DRI (Owner)</label>
                  {isEditing ? (
                    <Input 
                      value={editedRelease.dri}
                      onChange={(e) => 
                        setEditedRelease({...editedRelease, dri: e.target.value})
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{release.dri}</p>
                  )}
                </div>

                {/* Release Notes */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Release Notes</label>
                  {isEditing ? (
                    <Input 
                      value={editedRelease.releaseNotes}
                      onChange={(e) => 
                        setEditedRelease({...editedRelease, releaseNotes: e.target.value})
                      }
                    />
                  ) : (
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
                  )}
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Status</label>
                  {isEditing ? (
                    <Select
                      value={editedRelease.status}
                      onValueChange={(value: "Planned" | "Deployed") => 
                        setEditedRelease({...editedRelease, status: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planned">Planned</SelectItem>
                        <SelectItem value="Deployed">Deployed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900">{release.status}</p>
                  )}
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
                  {isEditing ? (
                    <Input 
                      value={editedRelease.description}
                      onChange={(e) => 
                        setEditedRelease({...editedRelease, description: e.target.value})
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{release.description}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
