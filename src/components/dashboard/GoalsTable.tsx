
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Check, X } from "lucide-react";

interface Goal {
  businessUnit: string;
  product: string;
  name: string;
  isOnTrack: boolean;
}

interface GoalsTableProps {
  goals: Goal[];
}

export const GoalsTable = ({ goals }: GoalsTableProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Unit</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Goal Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal, index) => (
            <TableRow key={index}>
              <TableCell>{goal.businessUnit}</TableCell>
              <TableCell>{goal.product}</TableCell>
              <TableCell>{goal.name}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    goal.isOnTrack
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {goal.isOnTrack ? (
                    <>
                      <Check className="h-3 w-3" />
                      On Track
                    </>
                  ) : (
                    <>
                      <X className="h-3 w-3" />
                      Off Track
                    </>
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
