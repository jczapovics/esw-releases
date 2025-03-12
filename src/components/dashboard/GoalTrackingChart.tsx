
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface GoalTrackingChartProps {
  weeklyGoalData: Array<{
    week: string;
    onTrack: number;
    atRisk: number;
    total: number;
    percentage: number;
  }>;
}

export const GoalTrackingChart = ({ weeklyGoalData }: GoalTrackingChartProps) => {
  return (
    <Card className="shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Weekly Goal Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={weeklyGoalData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="onTrack" name="On Track Goals" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="atRisk" name="At Risk Goals" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="percentage" 
                name="% On Track" 
                stroke="#14b8a6" 
                strokeWidth={2} 
                dot={{ fill: '#14b8a6', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <Separator className="my-6" />
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Week</TableHead>
                <TableHead>Total Goals</TableHead>
                <TableHead>On Track</TableHead>
                <TableHead>At Risk</TableHead>
                <TableHead className="text-right">% On Track</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyGoalData.map((week) => (
                <TableRow key={week.week}>
                  <TableCell className="font-medium">{week.week}</TableCell>
                  <TableCell>{week.total}</TableCell>
                  <TableCell className="text-green-600">{week.onTrack}</TableCell>
                  <TableCell className="text-amber-600">{week.atRisk}</TableCell>
                  <TableCell className="text-right">{week.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
