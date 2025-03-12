
import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { GoalScorecard } from "@/components/dashboard/GoalScorecard";
import { GoalTrackingChart } from "@/components/dashboard/GoalTrackingChart";

const GoalDelivery = () => {
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");

  const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
  const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

  // Sample data - in a real app, this would come from an API
  const goalStats = [
    { name: "Total Goals", value: "24", change: "+3", trend: "up" as const },
    { name: "On Track", value: "78%", change: "+5%", trend: "up" as const },
    { name: "At Risk", value: "22%", change: "-5%", trend: "down" as const },
  ];

  const weeklyGoalData = [
    { week: "Week 1", onTrack: 15, atRisk: 5, total: 20, percentage: 75 },
    { week: "Week 2", onTrack: 16, atRisk: 6, total: 22, percentage: 73 },
    { week: "Week 3", onTrack: 18, atRisk: 4, total: 22, percentage: 82 },
    { week: "Week 4", onTrack: 17, atRisk: 5, total: 22, percentage: 77 },
    { week: "Week 5", onTrack: 19, atRisk: 5, total: 24, percentage: 79 },
    { week: "Week 6", onTrack: 18, atRisk: 6, total: 24, percentage: 75 },
    { week: "Week 7", onTrack: 19, atRisk: 5, total: 24, percentage: 79 },
    { week: "Week 8", onTrack: 21, atRisk: 3, total: 24, percentage: 88 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <GlobalFilters
          period={period}
          setPeriod={setPeriod}
          selectedBusinessUnit={selectedBusinessUnit}
          setSelectedBusinessUnit={setSelectedBusinessUnit}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          businessUnits={businessUnits}
          products={products}
        />
        
        <GoalScorecard stats={goalStats} />
        
        <GoalTrackingChart weeklyGoalData={weeklyGoalData} />
      </div>
    </DashboardLayout>
  );
};

export default GoalDelivery;
