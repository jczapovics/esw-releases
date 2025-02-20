
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

interface AddIncidentSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock releases data - in a real app this would come from your backend
const mockReleases = [
  { id: "1", name: "v1.0.0 - Payment Gateway" },
  { id: "2", name: "v2.1.0 - User Authentication" },
  { id: "3", name: "v1.5.0 - Analytics Dashboard" },
];

export function AddIncidentSheet({ isOpen, onClose }: AddIncidentSheetProps) {
  const [formData, setFormData] = useState({
    incidentName: "",
    dateReported: "",
    description: "",
    documentLink: "",
    linkedRelease: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically make an API call to save the incident
    console.log("Form submitted:", formData);
    toast.success("Incident added successfully");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Incident</SheetTitle>
          <SheetDescription>
            Fill in the details for the new incident
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Incident Name/ID</label>
              <Input
                value={formData.incidentName}
                onChange={(e) => 
                  setFormData({...formData, incidentName: e.target.value})
                }
                placeholder="Enter incident name or ID"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Reported</label>
              <Input
                type="date"
                value={formData.dateReported}
                onChange={(e) => 
                  setFormData({...formData, dateReported: e.target.value})
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => 
                  setFormData({...formData, description: e.target.value})
                }
                placeholder="Describe the incident"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Incident Document Link</label>
              <Input
                type="url"
                value={formData.documentLink}
                onChange={(e) => 
                  setFormData({...formData, documentLink: e.target.value})
                }
                placeholder="https://docs.google.com/..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Linked Release</label>
              <Select
                value={formData.linkedRelease}
                onValueChange={(value) => 
                  setFormData({...formData, linkedRelease: value})
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a release" />
                </SelectTrigger>
                <SelectContent>
                  {mockReleases.map((release) => (
                    <SelectItem key={release.id} value={release.id}>
                      {release.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Incident
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
