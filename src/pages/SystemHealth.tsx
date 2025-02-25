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
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
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
      "Automated User Experience Tests": true,
      "Log Monitoring": true,
      "System Metrics": true,
      "Alerts": false,
      "Status Dashboards": false,
      "Incident Management": true
    },
    lastMonthScores: {
      "Automated User Experience Tests": false, // Improved
      "Log Monitoring": true, // No change
      "System Metrics": true, // No change
      "Alerts": true, // Degraded
      "Status Dashboards": false, // No change
      "Incident Management": false // Improved
    }
  },
  {
    name: "User Authentication",
    businessUnit: "Security",
    scores: {
      "Automated User Experience Tests": true,
      "Log Monitoring": true,
      "System Metrics": true,
      "Alerts": true,
      "Status Dashboards": false,
      "Incident Management": true
    },
    lastMonthScores: {
      "Automated User Experience Tests": true, // No change
      "Log Monitoring": false, // Improved
      "System Metrics": true, // No change
      "Alerts": true, // No change
      "Status Dashboards": false, // No change
      "Incident Management": true // No change
    }
  },
  {
    name: "Analytics Dashboard",
    businessUnit: "Data Intelligence",
    scores: {
      "Automated User Experience Tests": false,
      "Log Monitoring": true,
      "System Metrics": true,
      "Alerts": false,
      "Status Dashboards": true,
      "Incident Management": false
    },
    lastMonthScores: {
      "Automated User Experience Tests": true, // Degraded
      "Log Monitoring": true, // No change
      "System Metrics": false, // Improved
      "Alerts": false, // No change
      "Status Dashboards": false, // Improved
      "Incident Management": false // No change
    }
  }
];

const SystemHealth = () => {
  // Calculate overall statistics
  const calculateStats = () => {
    let totalChecks = 0;
    let passedChecks = 0;
    let improvements = 0;
    let degradations = 0;

    products.forEach(product => {
      criteria.forEach(criterion => {
        totalChecks++;
        if (product.scores[criterion.name]) passedChecks++;
        
        const currentScore = product.scores[criterion.name];
        const lastMonthScore = product.lastMonthScores[criterion.name];
        if (!lastMonthScore && currentScore) improvements++;
        if (lastMonthScore && !currentScore) degradations++;
      });
    });

    return {
      passRate: Math.round((passedChecks / totalChecks) * 100),
      improvements,
      degradations,
      noChange: totalChecks - improvements - degradations
    };
  };

  const stats = calculateStats();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">System Health Scorecard</h1>
          <p className="text-gray-600">
            Track and improve the operational health of our products across six key criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-500">Overall Health</h3>
              <div className="mt-2 flex items-center">
                {stats.passRate >= 70 ? (
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                ) : stats.passRate >= 50 ? (
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-red-600" />
                )}
                <span className="ml-2 text-2xl font-bold">{stats.passRate}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-500">Improvements</h3>
              <div className="mt-2 flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-2xl font-bold">{stats.improvements}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-500">Degradations</h3>
              <div className="mt-2 flex items-center">
                <TrendingDown className="h-8 w-8 text-red-600" />
                <span className="ml-2 text-2xl font-bold">{stats.degradations}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-500">No Change</h3>
              <div className="mt-2 flex items-center">
                <Minus className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-2xl font-bold">{stats.noChange}</span>
              </div>
            </div>
          </Card>
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
          <div className="mb-4 flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" /> Improved
            </span>
            <span className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" /> Degraded
            </span>
            <span className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-gray-400" /> No Change
            </span>
          </div>
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
                    const currentScore = product.scores[criterion.name];
                    const lastMonthScore = product.lastMonthScores[criterion.name];
                    const hasImproved = !lastMonthScore && currentScore;
                    const hasDegraded = lastMonthScore && !currentScore;
                    
                    return (
                      <TableCell key={criterion.name} className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {currentScore ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                          {hasImproved && (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          )}
                          {hasDegraded && (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          {!hasImproved && !hasDegraded && (
                            <Minus className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
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
