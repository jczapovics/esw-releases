
import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";

const GoalDelivery = () => {
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");

  const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
  const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

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
      </div>
    </DashboardLayout>
  );
};

export default GoalDelivery;
