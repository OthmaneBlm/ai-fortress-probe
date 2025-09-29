import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, AlertTriangle, Shield, Globe, Database } from "lucide-react";

interface ProjectData {
  projectName: string;
  assetType: string;
  description: string;
  apiEndpoint: string;
  inputFormat: string;
  outputFormat: string;
  externalSources: boolean;
  internalKnowledge: boolean;
  ragImplementation: boolean;
  multiAgent: boolean;
  fewShotLearning: boolean;
}

interface ScopeReviewProps {
  projectData: ProjectData;
  onNext: () => void;
}

export const ScopeReview = ({ projectData, onNext }: ScopeReviewProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState([
    { id: "1", name: "Prompt Injection", severity: "critical", description: "Malicious prompts that manipulate AI behavior", trending: true },
    { id: "2", name: "Data Leakage", severity: "high", description: "Exposure of training data or sensitive information", trending: true },
    { id: "3", name: "Model Inversion", severity: "medium", description: "Extracting training data through model queries", trending: false },
    { id: "4", name: "Adversarial Examples", severity: "high", description: "Inputs designed to fool the AI model", trending: true },
    { id: "5", name: "Backdoor Attacks", severity: "critical", description: "Hidden triggers that cause malicious behavior", trending: false },
  ]);

  const handleSearch = async () => {
    setIsSearching(true);
    // Mock search - in real app would call vulnerability API
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-risk-critical/10 text-risk-critical border-risk-critical/20";
      case "high": return "bg-risk-high/10 text-risk-high border-risk-high/20";
      case "medium": return "bg-risk-medium/10 text-risk-medium border-risk-medium/20";
      case "low": return "bg-risk-low/10 text-risk-low border-risk-low/20";
      default: return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case "rag": return Database;
      case "multiagent": return Globe;
      default: return Shield;
    }
  };

  const AssetIcon = getAssetTypeIcon(projectData.assetType);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Project Summary */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AssetIcon className="h-6 w-6 text-primary" />
            <span>Project Scope Summary</span>
          </CardTitle>
          <CardDescription>Review your AI asset configuration before vulnerability assessment</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Project Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{projectData.projectName}</span></div>
                  <div><span className="text-muted-foreground">Type:</span> <span className="text-foreground">{projectData.assetType}</span></div>
                  <div><span className="text-muted-foreground">API:</span> <span className="text-foreground">{projectData.apiEndpoint || "Not provided"}</span></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Input/Output</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-muted-foreground">Input:</span> <span className="text-foreground">{projectData.inputFormat || "Not specified"}</span></div>
                  <div><span className="text-muted-foreground">Output:</span> <span className="text-foreground">{projectData.outputFormat || "Not specified"}</span></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">System Characteristics</h4>
                <div className="flex flex-wrap gap-2">
                  {projectData.ragImplementation && <Badge variant="secondary">RAG</Badge>}
                  {projectData.multiAgent && <Badge variant="secondary">Multi-Agent</Badge>}
                  {projectData.fewShotLearning && <Badge variant="secondary">Few-Shot</Badge>}
                  {projectData.externalSources && <Badge variant="secondary">External Sources</Badge>}
                  {projectData.internalKnowledge && <Badge variant="secondary">Knowledge Graphs</Badge>}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{projectData.description || "No description provided"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vulnerability Search */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-6 w-6 text-primary" />
            <span>Trending Vulnerabilities</span>
          </CardTitle>
          <CardDescription>Search for the latest AI security vulnerabilities and attack vectors</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <Input
              placeholder="Search for AI vulnerabilities, CVEs, or attack patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background/50"
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
            >
              {isSearching ? "Searching..." : "Search Web"}
            </Button>
          </div>
          
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{vuln.name}</h4>
                    {vuln.trending && (
                      <Badge variant="outline" className="text-xs border-amber-500/20 text-amber-400">
                        Trending
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{vuln.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(vuln.severity)}`}>
                    {vuln.severity.toUpperCase()}
                  </span>
                  <AlertTriangle className={`h-4 w-4 ${
                    vuln.severity === 'critical' ? 'text-risk-critical' :
                    vuln.severity === 'high' ? 'text-risk-high' :
                    'text-risk-medium'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
        >
          Proceed to Attack Simulation
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};