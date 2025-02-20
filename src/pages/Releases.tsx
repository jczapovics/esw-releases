import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Check, Link, Calendar, Edit2 } from "lucide-react";

// Type definitions
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

// Mock data
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
  },
  {
    id: 4,
    businessUnit: "Core Services",
    product: "Search Engine",
    releaseName: "v2.0",
    releaseDate: "2024-03-01",
    dri: "Bob Wilson",
    releaseNotes: "https://example.com/releases/search-v2-0",
    status: "Planned",
    quality: "Good",
    description: "Major performance improvements to the search algorithm.",
    incidents: 0
  }
];

const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];
const qualityLevels = ["All", "Good", "Bad"];

const Releases = () => {
  const [selectedBU, setSelectedBU] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedQuality, setSelectedQuality] = useState("All");
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRelease, setEditedRelease] = useState<Release | null>(null);

  const filteredReleases = releases.filter(release => {
    const matchesBU = selectedBU === "All" || release.businessUnit === selectedBU;
    const matchesProduct = selectedProduct === "All" || release.product === selectedProduct;
    const matchesQuality = selectedQuality === "All" || release.quality === selectedQuality;
    return matchesBU && matchesProduct && matchesQuality;
  });

  const handleReleaseClick = (release: Release) => {
    setSelectedRelease(release);
    setEditedRelease(release);
    setIsEditing(false);
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the release
    console.log("Saving release:", editedRelease);
    setIsEditing(false);
    setSelectedRelease(editedRelease);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Business Unit</label>
            <Select value={selectedBU} onValueChange={setSelectedBU}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Business Unit" />
              </SelectTrigger>
              <SelectContent>
                {businessUnits.map((bu) => (
                  <SelectItem key={bu} value={bu}>
                    {bu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Product</label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product} value={product}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quality</label>
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Quality" />
              </SelectTrigger>
              <SelectContent>
                {qualityLevels.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {quality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-4 gap-4 p-4 font-medium text-gray-700 border-b">
            <div>Business Unit</div>
            <div>Product</div>
            <div>Release Date</div>
            <div>Quality</div>
          </div>
          <div className="divide-y">
            {filteredReleases.map((release) => (
              <div 
                key={release.id} 
                className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => handleReleaseClick(release)}
              >
                <div>{release.businessUnit}</div>
                <div>{release.product}</div>
                <div>{new Date(release.releaseDate).toLocaleDateString()}</div>
                <div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    release.quality === "Good" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {release.quality === "Good" && <Check className="h-3 w-3" />}
                    {release.quality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Sheet open={!!selectedRelease} onOpenChange={() => setSelectedRelease(null)}>
          <SheetContent className="sm:max-w-[600px] overflow-y-auto">
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
            
            {selectedRelease && editedRelease && (
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
                          {businessUnits.filter(bu => bu !== "All").map((bu) => (
                            <SelectItem key={bu} value={bu}>
                              {bu}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-gray-900">{selectedRelease.businessUnit}</p>
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
                          {products.filter(p => p !== "All").map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-gray-900">{selectedRelease.product}</p>
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
                      <p className="text-sm text-gray-900">{selectedRelease.releaseName}</p>
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
                        {new Date(selectedRelease.releaseDate).toLocaleDateString()}
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
                      <p className="text-sm text-gray-900">{selectedRelease.dri}</p>
                    )}
                  </div>

                  {/* Release Notes */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Release Note Link</label>
                    {isEditing ? (
                      <Input 
                        value={editedRelease.releaseNotes}
                        onChange={(e) => 
                          setEditedRelease({...editedRelease, releaseNotes: e.target.value})
                        }
                      />
                    ) : (
                      <a 
                        href={selectedRelease.releaseNotes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
                      >
                        <Link className="h-4 w-4" />
                        View Notes
                      </a>
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
                      <p className="text-sm text-gray-900">{selectedRelease.status}</p>
                    )}
                  </div>

                  {/* Quality */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Quality</label>
                    <div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        selectedRelease.quality === "Good" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {selectedRelease.quality === "Good" && <Check className="h-3 w-3" />}
                        {selectedRelease.quality}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedRelease.incidents} incident(s) reported
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
                      <p className="text-sm text-gray-900">{selectedRelease.description}</p>
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
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
};

export default Releases;
