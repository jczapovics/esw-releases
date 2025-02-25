
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ActivityItem {
  id: number;
  title: string;
  product: string;
  releaseName: string;
  description: string;
  date: string;
  type: "release" | "incident";
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReleaseClick: (activity: ActivityItem) => void;
}

export const ActivityFeed = ({
  activities,
  currentPage,
  totalPages,
  onPageChange,
  onReleaseClick,
}: ActivityFeedProps) => {
  return (
    <Card className="p-6 w-full shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 animate-slideIn p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                activity.type === "release"
                  ? "bg-brand-500"
                  : "bg-red-500"
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
              <button
                onClick={() => onReleaseClick(activity)}
                className="text-xs text-brand-600 mt-1 hover:text-brand-700"
              >
                {activity.product} • {activity.releaseName}
              </button>
              <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => onPageChange(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
};
