
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  Bot,
  ScrollText,
  Activity,
  Bell,
  LayoutDashboard,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const criteria = [
  {
    name: "Automated User Experience Tests",
    icon: Bot,
    description: "Synthetic canary tests for critical user journeys",
    details: "Tests should cover the top 5 critical user flows (e.g., login, transaction, file upload) and run every 5 minutes to ensure functionality.",
    industryStandard: "AWS Well-Architected recommends active monitoring via synthetic user canary transactions."
  },
  {
    name: "Log Monitoring",
    icon: ScrollText,
    description: "Centralized logging with real-time error alerting",
    details: "Centralized logging system that captures application errors with search capabilities and real-time alerting.",
    industryStandard: "AWS Well-Architected Framework recommends centralizing log storage for simplified analysis."
  },
  {
    name: "System Metrics",
    icon: Activity,
    description: "Real-time infrastructure monitoring",
    details: "Continuous monitoring of CPU, memory, disk, and network usage for all critical infrastructure components.",
    industryStandard: "AWS Well-Architected Framework emphasizes monitoring key infrastructure metrics."
  },
  {
    name: "Alerts",
    icon: Bell,
    description: "Actionable alerts for metrics and tests",
    details: "Documented alert rules with clear response instructions and ownership for each key metric and canary test.",
    industryStandard: "DORA's DevOps guidelines stress configuring alerts with clear ownership and actionable responses."
  },
  {
    name: "Status Dashboards",
    icon: LayoutDashboard,
    description: "Consolidated real-time health dashboard",
    details: "Single dashboard showing system metrics and canary statuses, updated in real-time.",
    industryStandard: "AWS guidance suggests combining metrics into a single 'pane of glass' dashboard."
  },
  {
    name: "Incident Management",
    icon: AlertOctagon,
    description: "Documented incident process and reviews",
    details: "Defined on-call rotation, escalation paths, and post-incident review process.",
    industryStandard: "Google's SRE practices recommend 24/7 on-call rotations and blameless post-incident reviews."
  }
];

const products = [
  {
    name: "Payment Gateway",
    businessUnit: "Financial Services",
    scores: {
      "Automated User Experience Tests": 80,
      "Log Monitoring": 90,
      "System Metrics": 100,
      "Alerts": 85,
      "Status Dashboards": 70,
      "Incident Management": 95
    }
  },
  {
    name: "User Authentication",
    businessUnit: "Security",
    scores: {
      "Automated User Experience Tests": 95,
      "Log Monitoring": 100,
      "System Metrics": 90,
      "Alerts": 90,
      "Status Dashboards": 85,
      "Incident Management": 100
    }
  },
  {
    name: "Analytics Dashboard",
    businessUnit: "Data Intelligence",
    scores: {
      "Automated User Experience Tests": 70,
      "Log Monitoring": 85,
      "System Metrics": 95,
      "Alerts": 80,
      "Status Dashboards": 90,
      "Incident Management": 85
    }
  }
];

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-50";
  if (score >= 70) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

const SystemHealth = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">System Health Scorecard</h1>
          <p className="text-gray-600">
            Track and improve the operational health of our products across six key criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteria.map((criterion) => (
            <Card key={criterion.name} className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-brand-50 p-2">
                  <criterion.icon className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{criterion.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-gray-500 mt-2 hover:text-gray-900">
                        <Info className="h-3 w-3" />
                        Industry Standard
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">{criterion.industryStandard}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Health Scores</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Business Unit</TableHead>
                {criteria.map((criterion) => (
                  <TableHead key={criterion.name} className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="inline-flex items-center gap-1">
                          <criterion.icon className="h-4 w-4" />
                          <span className="sr-only">{criterion.name}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">{criterion.name}</p>
                          <p className="text-xs mt-1">{criterion.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.businessUnit}</TableCell>
                  {criteria.map((criterion) => {
                    const score = product.scores[criterion.name];
                    return (
                      <TableCell key={criterion.name} className="text-center">
                        <span className={`inline-flex items-center justify-center w-12 h-8 rounded-full font-medium text-sm ${getScoreColor(score)}`}>
                          {score}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemHealth;
