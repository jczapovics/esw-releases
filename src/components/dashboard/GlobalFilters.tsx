
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Period = "month" | "quarter" | "year";

interface GlobalFiltersProps {
  period?: Period;
  setPeriod?: (period: Period) => void;
  selectedBusinessUnit: string;
  setSelectedBusinessUnit: (unit: string) => void;
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
  businessUnits: string[];
  products: string[];
  hideTimePeriod?: boolean;
}

export const GlobalFilters = ({
  period,
  setPeriod,
  selectedBusinessUnit,
  setSelectedBusinessUnit,
  selectedProduct,
  setSelectedProduct,
  businessUnits,
  products,
  hideTimePeriod = false,
}: GlobalFiltersProps) => {
  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {!hideTimePeriod && period && setPeriod && (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Time Period</span>
              <div className="flex space-x-2">
                <Button
                  variant={period === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriod("month")}
                >
                  Month
                </Button>
                <Button
                  variant={period === "quarter" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriod("quarter")}
                >
                  Quarter
                </Button>
                <Button
                  variant={period === "year" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriod("year")}
                >
                  Year
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Business Unit</span>
            <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Business Unit" />
              </SelectTrigger>
              <SelectContent>
                {businessUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Product</span>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product} value={product}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};
