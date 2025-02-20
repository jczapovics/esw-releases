
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Check, Link } from "lucide-react";

// Mock data - in a real app this would come from an API
const releases = [
  {
    id: 1,
    businessUnit: "Financial Services",
    product: "Payment Gateway",
    quality: "high",
    date: "2024-03-15",
    releaseNotes: "https://example.com/releases/payment-gateway-v2-1"
  },
  {
    id: 2,
    businessUnit: "Security",
    product: "User Authentication",
    quality: "low",
    date: "2024-03-10",
    releaseNotes: "https://example.com/releases/auth-service-v1-5"
  },
  {
    id: 3,
    businessUnit: "Data Intelligence",
    product: "Analytics Dashboard",
    quality: "high",
    date: "2024-03-05",
    releaseNotes: "https://example.com/releases/analytics-v3-0"
  },
  {
    id: 4,
    businessUnit: "Core Services",
    product: "Search Engine",
    quality: "low",
    date: "2024-03-01",
    releaseNotes: "https://example.com/releases/search-v2-0"
  }
];

const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];
const qualityLevels = ["All", "high", "low"];

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

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-5 gap-4 p-4 font-medium text-gray-700 border-b">
            <div>Business Unit</div>
            <div>Product</div>
            <div>Release Date</div>
            <div>Quality</div>
            <div>Release Notes</div>
          </div>
          <div className="divide-y">
            {filteredReleases.map((release) => (
              <div key={release.id} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50">
                <div>{release.businessUnit}</div>
                <div>{release.product}</div>
                <div>{new Date(release.date).toLocaleDateString()}</div>
                <div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    release.quality === "high" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {release.quality === "high" && <Check className="h-3 w-3" />}
                    {release.quality.charAt(0).toUpperCase() + release.quality.slice(1)}
                  </span>
                </div>
                <div>
                  <a 
                    href={release.releaseNotes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Link className="h-4 w-4" />
                    View Notes
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Releases;
