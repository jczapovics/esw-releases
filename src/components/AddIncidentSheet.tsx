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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Edit2, Trash2 } from "lucide-react";

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
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically make an API call to save the incident
    console.log("Form submitted:", formData);
    toast.success("Incident added successfully");
    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // In a real app, this would make an API call to delete the incident
    console.log("Deleting incident:", formData);
    toast.success("Incident deleted successfully");
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the incident
              "{formData.incidentName}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Incident
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Add New Incident</span>
              {!isEditing && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </SheetTitle>
            <SheetDescription>
              Fill in the details for the new incident
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <label
                htmlFor="incidentName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Incident Name
              </label>
              <Input
                id="incidentName"
                placeholder="Enter incident name"
                className="w-full"
                value={formData.incidentName}
                onChange={(e) =>
                  setFormData({ ...formData, incidentName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="dateReported"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Date Reported
              </label>
              <Input
                type="date"
                id="dateReported"
                className="w-full"
                value={formData.dateReported}
                onChange={(e) =>
                  setFormData({ ...formData, dateReported: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Description
              </label>
              <Input
                id="description"
                placeholder="Enter description"
                className="w-full"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="documentLink"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Document Link
              </label>
              <Input
                id="documentLink"
                placeholder="Enter document link"
                className="w-full"
                value={formData.documentLink}
                onChange={(e) =>
                  setFormData({ ...formData, documentLink: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="linkedRelease"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Linked Release
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, linkedRelease: value })
                }
              >
                <SelectTrigger className="w-full">
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
    </>
  );
}
