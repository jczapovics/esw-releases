
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

type Period = "month" | "quarter" | "year";

interface GlobalFiltersProps {
  period: Period;
  setPeriod: (period: Period) => void;
  selectedBusinessUnit: string;
  setSelectedBusinessUnit: (unit: string) => void;
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
  businessUnits: string[];
  products: string[];
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
}: GlobalFiltersProps) => {
  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
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

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Business Unit</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between"
                >
                  {selectedBusinessUnit}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search business unit..." />
                  <CommandEmpty>No business unit found.</CommandEmpty>
                  <CommandGroup>
                    {businessUnits.map((unit) => (
                      <CommandItem
                        key={unit}
                        value={unit}
                        onSelect={() => setSelectedBusinessUnit(unit)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedBusinessUnit === unit ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {unit}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Product</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between"
                >
                  {selectedProduct}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search product..." />
                  <CommandEmpty>No product found.</CommandEmpty>
                  <CommandGroup>
                    {products.map((product) => (
                      <CommandItem
                        key={product}
                        value={product}
                        onSelect={() => setSelectedProduct(product)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedProduct === product ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {product}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </Card>
  );
};
