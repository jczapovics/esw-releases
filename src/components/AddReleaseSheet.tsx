
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddReleaseSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const businessUnits = ["Financial Services", "Security", "Data Intelligence", "Core Services"];
const products = ["Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

export function AddReleaseSheet({ isOpen, onClose }: AddReleaseSheetProps) {
  const [formData, setFormData] = useState({
    businessUnit: "",
    product: "",
    releaseName: "",
    releaseDate: "",
    dri: "",
    releaseNotes: "",
    status: "Planned" as "Planned" | "Deployed"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically make an API call to save the release
    console.log("Form submitted:", formData);
    toast.success("Release added successfully");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Release</SheetTitle>
          <SheetDescription>
            Fill in the details for the new release
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Unit</label>
              <Select
                value={formData.businessUnit}
                onValueChange={(value) => 
                  setFormData({...formData, businessUnit: value})
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Product</label>
              <Select
                value={formData.product}
                onValueChange={(value) => 
                  setFormData({...formData, product: value})
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Release Name/Version</label>
              <Input
                value={formData.releaseName}
                onChange={(e) => 
                  setFormData({...formData, releaseName: e.target.value})
                }
                placeholder="e.g., v1.0.0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Release Date</label>
              <Input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => 
                  setFormData({...formData, releaseDate: e.target.value})
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">DRI (Owner)</label>
              <Input
                value={formData.dri}
                onChange={(e) => 
                  setFormData({...formData, dri: e.target.value})
                }
                placeholder="Enter DRI name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Release Note Link</label>
              <Input
                type="url"
                value={formData.releaseNotes}
                onChange={(e) => 
                  setFormData({...formData, releaseNotes: e.target.value})
                }
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value: "Planned" | "Deployed") => 
                  setFormData({...formData, status: value})
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
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Release
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
