
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

interface ReleaseScorecardProps {
  selectedBusinessUnit: string;
  selectedProduct: string;
  setSelectedBusinessUnit: (value: string) => void;
  setSelectedProduct: (value: string) => void;
  businessUnits: string[];
  products: string[];
  monthlyQualityTrend: Array<{
    month: string;
    quality: number;
    releases: number;
  }>;
}

export function ReleaseScorecard({
  selectedBusinessUnit,
  selectedProduct,
  setSelectedBusinessUnit,
  setSelectedProduct,
  businessUnits,
  products,
  monthlyQualityTrend,
}: ReleaseScorecardProps) {
  const qualityCardRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="p-6 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1" ref={qualityCardRef}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Release Scorecard</h2>
        <div className="flex items-center gap-6">
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
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>This Month</span>
            <span className="font-medium">88%</span>
          </div>
          <Progress value={88} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>This Quarter</span>
            <span className="font-medium">90%</span>
          </div>
          <Progress value={90} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>This Year</span>
            <span className="font-medium">92%</span>
          </div>
          <Progress value={92} className="h-2" />
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Monthly Trend</h3>
          <div className="chart-container h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyQualityTrend}>
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[80, 100]}
                  ticks={[80, 85, 90, 95, 100]}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 25]}
                  ticks={[0, 5, 10, 15, 20, 25]}
                />
                <RechartsTooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="quality" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6', strokeWidth: 2 }}
                  name="Quality Score"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="releases" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2 }}
                  name="Number of Releases"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}
