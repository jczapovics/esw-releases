
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Check, X } from "lucide-react";

// Mock data - in a real app this would come from an API
const releases = [
  {
    id: 1,
    name: "Payment Gateway v2.1",
    businessUnit: "Financial Services",
    product: "Payment Gateway",
    quality: "high",
    date: "2024-03-15",
    status: "success"
  },
  {
    id: 2,
    name: "Auth Service v1.5",
    businessUnit: "Security",
    product: "User Authentication",
    quality: "medium",
    date: "2024-03-10",
    status: "failed"
  },
  {
    id: 3,
    name: "Analytics Dashboard v3.0",
    businessUnit: "Data Intelligence",
    product: "Analytics Dashboard",
    quality: "high",
    date: "2024-03-05",
    status: "success"
  },
  {
    id: 4,
    name: "Search Service v2.0",
    businessUnit: "Core Services",
    product: "Search Engine",
    quality: "low",
    date: "2024-03-01",
    status: "success"
  }
];

const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];
const qualityLevels = ["All", "high", "medium", "low"];

const Releases = () => {
  const [selectedBU, setSelectedBU] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedQuality, setSelectedQuality] = useState("All");

  const filteredReleases = releases.filter(release => {
    const matchesBU = selectedBU === "All" || release.businessUnit === selectedBU;
    const matchesProduct = selectedProduct === "All" || release.product === selectedProduct;
    const matchesQuality = selectedQuality === "All" || release.quality === selectedQuality;
    return matchesBU && matchesProduct && matchesQuality;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm">
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

          <Select value={selectedQuality} onValueChange={setSelectedQuality}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Quality" />
            </SelectTrigger>
            <SelectContent>
              {qualityLevels.map((quality) => (
                <SelectItem key={quality} value={quality}>
                  {quality.charAt(0).toUpperCase() + quality.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredReleases.map((release) => (
            <Card key={release.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{release.name}</h3>
                    {release.status === "success" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {release.businessUnit} • {release.product}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      release.quality === "high" 
                        ? "bg-green-100 text-green-800" 
                        : release.quality === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {release.quality.charAt(0).toUpperCase() + release.quality.slice(1)} Quality
                    </span>
                    <span className="text-xs text-gray-500">
                      Released on {new Date(release.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Releases;
