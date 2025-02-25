
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

type ProductQuality = {
  product: string;
  qualityPercentage: number;
  incidents: number;
  trend: "up" | "down";
  change: string;
};

type ActiveProduct = {
  product: string;
  releases: number;
  change: string;
  trend: "up" | "down";
};

interface ProductMetricsGridProps {
  productQualityRanking: ProductQuality[];
  activeProducts: ActiveProduct[];
}

export const ProductMetricsGrid = ({
  productQualityRanking,
  activeProducts,
}: ProductMetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Product Quality Ranking</h2>
        </div>
        <div className="space-y-4">
          {productQualityRanking.map((product, index) => (
            <div
              key={product.product}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-sm">{product.product}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      product.qualityPercentage >= 90 
                        ? "bg-green-100 text-green-800"
                        : product.qualityPercentage >= 85
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {product.qualityPercentage}% Quality
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.incidents} incidents
                    </span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                product.trend === "up" 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {product.trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span className="text-sm">{product.change}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Most Active Products</h2>
        </div>
        <div className="space-y-4">
          {activeProducts.map((product, index) => (
            <div
              key={product.product}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-sm">{product.product}</p>
                  <span className="text-xs text-gray-500">
                    {product.releases} releases
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                product.trend === "up" 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {product.trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span className="text-sm">{product.change}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
