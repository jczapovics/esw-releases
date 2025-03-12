
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState<string[]>([selectedBusinessUnit].filter(Boolean));
  const [selectedProducts, setSelectedProducts] = useState<string[]>([selectedProduct].filter(Boolean));
  
  const handleBusinessUnitChange = (unit: string) => {
    setSelectedBusinessUnits(prev => {
      const isSelected = prev.includes(unit);
      let newSelection: string[];
      
      if (isSelected) {
        newSelection = prev.filter(item => item !== unit);
      } else {
        newSelection = [...prev, unit];
      }
      
      // Update the parent component's state with the first selected item or empty string
      setSelectedBusinessUnit(newSelection.length > 0 ? newSelection[0] : "");
      
      return newSelection;
    });
  };
  
  const handleProductChange = (product: string) => {
    setSelectedProducts(prev => {
      const isSelected = prev.includes(product);
      let newSelection: string[];
      
      if (isSelected) {
        newSelection = prev.filter(item => item !== product);
      } else {
        newSelection = [...prev, product];
      }
      
      // Update the parent component's state with the first selected item or empty string
      setSelectedProduct(newSelection.length > 0 ? newSelection[0] : "");
      
      return newSelection;
    });
  };

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
          
          {/* Multi-select Business Unit Filter */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Business Unit</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-[180px] justify-between">
                  {selectedBusinessUnits.length === 0 
                    ? "Select Units" 
                    : selectedBusinessUnits.length === 1 
                      ? selectedBusinessUnits[0] 
                      : `${selectedBusinessUnits.length} units selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search business units..." />
                  <CommandEmpty>No business unit found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {businessUnits.map((unit) => (
                      <CommandItem
                        key={`bu-${unit}`}
                        value={unit}
                        onSelect={() => handleBusinessUnitChange(unit)}
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Checkbox 
                            checked={selectedBusinessUnits.includes(unit)} 
                            id={`business-unit-${unit}`}
                            onCheckedChange={() => handleBusinessUnitChange(unit)}
                            className="mr-2"
                          />
                          <span>{unit}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Multi-select Product Filter */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Product</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-[180px] justify-between">
                  {selectedProducts.length === 0 
                    ? "Select Products" 
                    : selectedProducts.length === 1 
                      ? selectedProducts[0] 
                      : `${selectedProducts.length} products selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search products..." />
                  <CommandEmpty>No product found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {products.map((product) => (
                      <CommandItem
                        key={`product-${product}`}
                        value={product}
                        onSelect={() => handleProductChange(product)}
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Checkbox 
                            checked={selectedProducts.includes(product)} 
                            id={`product-${product}`}
                            onCheckedChange={() => handleProductChange(product)}
                            className="mr-2"
                          />
                          <span>{product}</span>
                        </div>
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
