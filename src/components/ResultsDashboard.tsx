import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AlertTriangle, Shield, TrendingUp, Download, FileText, Target } from "lucide-react";

interface ResultsDashboardProps {
  onBackToDashboard: () => void;
}

export const ResultsDashboard = ({ onBackToDashboard }: ResultsDashboardProps) => {
  const riskSummary = {
    critical: 3,
    high: 7,
    medium: 12,
    low: 5,
    total: 27
  };

  const vulnerabilityData = [
    { name: "Prompt Injection", critical: 2, high: 3, medium: 1, low: 0 },
    { name: "Data Leakage", critical: 1, high: 2, medium: 3, low: 1 },
    { name: "Adversarial", critical: 0, high: 2, medium: 4, low: 2 },
    { name: "Jailbreak", critical: 0, high: 0, medium: 4, low: 2 },
  ];

  const riskDistribution = [
    { name: "Critical", value: riskSummary.critical, color: "#EF4444" },
    { name: "High", value: riskSummary.high, color: "#F97316" },
    { name: "Medium", value: riskSummary.medium, color: "#EAB308" },
    { name: "Low", value: riskSummary.low, color: "#22C55E" },
  ];

  const kpis = [
    {
      title: "Risk Score",
      value: "8.2/10",
      change: "+15%",
      icon: TrendingUp,
      color: "text-risk-high",
      bgColor: "bg-risk-high/10"
    },
    {
      title: "Vulnerabilities",
      value: riskSummary.total.toString(),
      change: "27 found",
      icon: AlertTriangle,
      color: "text-risk-critical",
      bgColor: "bg-risk-critical/10"
    },
    {
      title: "Attack Success Rate",
      value: "73%",
      change: "High exposure",
      icon: Target,
      color: "text-risk-medium",
      bgColor: "bg-risk-medium/10"
    },
    {
      title: "Security Posture",
      value: "Poor",
      change: "Needs attention",
      icon: Shield,
      color: "text-risk-high",
      bgColor: "bg-risk-high/10"
    },
  ];

  const vulnerabilityDetails = [
    {
      id: "V001",
      title: "SQL Injection via Prompt",
      severity: "critical",
      description: "User prompts can inject SQL commands through RAG system",
      impact: "Data breach, unauthorized access",
      remediation: "Implement input sanitization and parameterized queries"
    },
    {
      id: "V002", 
      title: "Training Data Extraction",
      severity: "high",
      description: "Model can be tricked into revealing training data",
      impact: "Sensitive information disclosure",
      remediation: "Add differential privacy and output filtering"
    },
    {
      id: "V003",
      title: "Prompt Injection Bypass",
      severity: "critical",
      description: "System instructions can be overridden by user input",
      impact: "Complete system compromise",
      remediation: "Implement strict prompt isolation and validation"
    },
    {
      id: "V004",
      title: "Model Inversion Attack",
      severity: "medium",
      description: "Adversarial queries can reconstruct training examples",
      impact: "Privacy violations",
      remediation: "Add query rate limiting and anomaly detection"
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-risk-critical/10 text-risk-critical border-risk-critical/20";
      case "high": return "bg-risk-high/10 text-risk-high border-risk-high/20";
      case "medium": return "bg-risk-medium/10 text-risk-medium border-risk-medium/20";
      case "low": return "bg-risk-low/10 text-risk-low border-risk-low/20";
      default: return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  const overallRiskScore = () => {
    const totalScore = (riskSummary.critical * 4) + (riskSummary.high * 3) + (riskSummary.medium * 2) + (riskSummary.low * 1);
    const maxScore = riskSummary.total * 4;
    return Math.round((totalScore / maxScore) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Red Team Assessment Results</h2>
          <p className="text-muted-foreground">Comprehensive security analysis completed</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-border/50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="border-border/50">
            <FileText className="h-4 w-4 mr-2" />
            Generate PDF
          </Button>
          <Button 
            onClick={onBackToDashboard}
            className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className={`text-xs ${kpi.color}`}>{kpi.change}</p>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Vulnerability severity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vulnerability by Category */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Vulnerabilities by Category</CardTitle>
            <CardDescription>Attack vector analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vulnerabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Bar dataKey="critical" stackId="a" fill="#EF4444" />
                  <Bar dataKey="high" stackId="a" fill="#F97316" />
                  <Bar dataKey="medium" stackId="a" fill="#EAB308" />
                  <Bar dataKey="low" stackId="a" fill="#22C55E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Risk Score */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span>Overall Security Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Security Risk Level</span>
              <span className="text-2xl font-bold text-risk-high">{overallRiskScore()}% Risk</span>
            </div>
            <Progress value={overallRiskScore()} className="w-full h-3" />
            <p className="text-sm text-muted-foreground">
              Based on {riskSummary.total} vulnerabilities found across {vulnerabilityData.length} attack categories.
              Immediate attention required for {riskSummary.critical} critical and {riskSummary.high} high-severity issues.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Vulnerabilities */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Vulnerability Details</CardTitle>
          <CardDescription>Critical and high-priority security issues requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vulnerabilityDetails.map((vuln) => (
              <div key={vuln.id} className="p-4 rounded-lg border border-border/50 bg-background/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-foreground">{vuln.title}</h4>
                      <Badge className={`text-xs ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{vuln.id}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Impact: </span>
                    <span className="text-muted-foreground">{vuln.impact}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Remediation: </span>
                    <span className="text-muted-foreground">{vuln.remediation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};