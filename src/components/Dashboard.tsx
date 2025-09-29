import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, Shield, TrendingUp, AlertTriangle } from "lucide-react";

interface DashboardProps {
  onCreateProject: () => void;
}

export const Dashboard = ({ onCreateProject }: DashboardProps) => {
  const stats = [
    { label: "Active Projects", value: "3", icon: Target, color: "text-primary" },
    { label: "Vulnerabilities Found", value: "47", icon: AlertTriangle, color: "text-risk-high" },
    { label: "Assets Tested", value: "12", icon: Shield, color: "text-risk-info" },
    { label: "Risk Score", value: "8.2/10", icon: TrendingUp, color: "text-risk-medium" },
  ];

  const recentProjects = [
    { name: "ChatBot API Assessment", status: "completed", risk: "high", date: "2024-01-15" },
    { name: "RAG System Analysis", status: "running", risk: "medium", date: "2024-01-14" },
    { name: "Multi-Agent Framework", status: "pending", risk: "critical", date: "2024-01-13" },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "text-risk-critical bg-risk-critical/10 border-risk-critical/20";
      case "high": return "text-risk-high bg-risk-high/10 border-risk-high/20";
      case "medium": return "text-risk-medium bg-risk-medium/10 border-risk-medium/20";
      case "low": return "text-risk-low bg-risk-low/10 border-risk-low/20";
      default: return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Start a new red team assessment or manage existing projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={onCreateProject}
              className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Red Team Project
            </Button>
            <Button variant="outline" className="border-border/50">
              <Target className="h-4 w-4 mr-2" />
              View All Assets
            </Button>
            <Button variant="outline" className="border-border/50">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Vulnerability Database
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Latest red team assessments and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">Created: {project.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(project.risk)}`}>
                    {project.risk.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-risk-low/10 text-risk-low border border-risk-low/20' :
                    project.status === 'running' ? 'bg-risk-medium/10 text-risk-medium border border-risk-medium/20' :
                    'bg-muted/10 text-muted-foreground border border-border'
                  }`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};