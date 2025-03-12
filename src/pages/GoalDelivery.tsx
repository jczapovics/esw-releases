import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { GoalScorecard } from "@/components/dashboard/GoalScorecard";
import { GoalsTable } from "@/components/dashboard/GoalsTable";

const GoalDelivery = () => {
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");

  const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
  const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

  const goalStats = [
    { name: "Total Goals", value: "24", change: "+3", trend: "up" as const },
    { name: "On Track", value: "78%", change: "+5%", trend: "up" as const },
    { name: "At Risk", value: "22%", change: "-5%", trend: "down" as const },
  ];

  const weeklyGoalData = [
    { week: "Week 1", onTrack: 15, total: 20, percentage: 75 },
    { week: "Week 2", onTrack: 16, total: 22, percentage: 73 },
    { week: "Week 3", onTrack: 18, total: 22, percentage: 82 },
    { week: "Week 4", onTrack: 17, total: 22, percentage: 77 },
    { week: "Week 5", onTrack: 19, total: 24, percentage: 79 },
    { week: "Week 6", onTrack: 18, total: 24, percentage: 75 },
    { week: "Week 7", onTrack: 19, total: 24, percentage: 79 },
    { week: "Week 8", onTrack: 21, total: 24, percentage: 88 },
  ];

  const goals = [
    {
      businessUnit: "Financial Services",
      product: "Payment Gateway",
      name: "Reduce Transaction Time",
      isOnTrack: true,
    },
    {
      businessUnit: "Security",
      product: "User Authentication",
      name: "Implement 2FA",
      isOnTrack: false,
    },
    {
      businessUnit: "Data Intelligence",
      product: "Analytics Dashboard",
      name: "Real-time Analytics",
      isOnTrack: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <GlobalFilters
          hideTimePeriod
          selectedBusinessUnit={selectedBusinessUnit}
          setSelectedBusinessUnit={setSelectedBusinessUnit}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          businessUnits={businessUnits}
          products={products}
        />
        
        <GoalScorecard 
          stats={goalStats} 
          weeklyGoalData={weeklyGoalData}
        />

        <GoalsTable goals={goals} />
      </div>
    </DashboardLayout>
  );
};

export default GoalDelivery;
