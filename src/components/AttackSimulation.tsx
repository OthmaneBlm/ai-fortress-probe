import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Zap, Target, Clock, AlertTriangle } from "lucide-react";

interface AttackSimulationProps {
  onComplete: () => void;
}

export const AttackSimulation = ({ onComplete }: AttackSimulationProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [numberOfAttacks, setNumberOfAttacks] = useState([10]);
  const [apiKey, setApiKey] = useState("");
  const [selectedAttacks, setSelectedAttacks] = useState({
    promptInjection: true,
    dataExtraction: true,
    adversarial: true,
    jailbreak: true,
    backdoor: false,
    poisoning: false,
  });

  const attackTypes = [
    { id: "promptInjection", name: "Prompt Injection", description: "Test resistance to malicious prompts", severity: "critical" },
    { id: "dataExtraction", name: "Data Extraction", description: "Attempt to extract training data", severity: "high" },
    { id: "adversarial", name: "Adversarial Examples", description: "Generate inputs to fool the model", severity: "high" },
    { id: "jailbreak", name: "Jailbreak Attempts", description: "Bypass safety restrictions", severity: "critical" },
    { id: "backdoor", name: "Backdoor Detection", description: "Check for hidden triggers", severity: "medium" },
    { id: "poisoning", name: "Data Poisoning", description: "Test training data integrity", severity: "medium" },
  ];

  const [testResults, setTestResults] = useState([
    { name: "Prompt Injection", status: "running", progress: 45, findings: 3 },
    { name: "Data Extraction", status: "completed", progress: 100, findings: 1 },
    { name: "Adversarial Examples", status: "pending", progress: 0, findings: 0 },
    { name: "Jailbreak Attempts", status: "pending", progress: 0, findings: 0 },
  ]);

  const handleRun = () => {
    setIsRunning(true);
    setIsPaused(false);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-risk-critical";
      case "high": return "text-risk-high";
      case "medium": return "text-risk-medium";
      case "low": return "text-risk-low";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-risk-low/10 text-risk-low border-risk-low/20";
      case "running": return "bg-risk-medium/10 text-risk-medium border-risk-medium/20";
      case "failed": return "bg-risk-critical/10 text-risk-critical border-risk-critical/20";
      default: return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Configuration */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-primary" />
            <span>Attack Configuration</span>
          </CardTitle>
          <CardDescription>Configure and execute penetration testing attacks against your AI asset</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Attack Parameters */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Number of Attacks: {numberOfAttacks[0]}</Label>
                <Slider
                  value={numberOfAttacks}
                  onValueChange={setNumberOfAttacks}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key (Optional)</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter API key for target system"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>

            {/* Attack Types */}
            <div className="space-y-4">
              <Label>Attack Types</Label>
              <div className="space-y-3">
                {attackTypes.map((attack) => (
                  <div key={attack.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 bg-background/30">
                    <Checkbox
                      id={attack.id}
                      checked={selectedAttacks[attack.id as keyof typeof selectedAttacks]}
                      onCheckedChange={(checked) => 
                        setSelectedAttacks(prev => ({ ...prev, [attack.id]: checked }))
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Label htmlFor={attack.id} className="text-sm font-medium">
                          {attack.name}
                        </Label>
                        <AlertTriangle className={`h-3 w-3 ${getSeverityColor(attack.severity)}`} />
                      </div>
                      <p className="text-xs text-muted-foreground">{attack.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-border/50">
            <Button 
              onClick={handleRun}
              disabled={isRunning}
              className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Run Simulation
            </Button>
            
            <Button 
              onClick={handlePause}
              disabled={!isRunning}
              variant="outline"
              className="border-border/50"
            >
              <Pause className="h-4 w-4 mr-2" />
              {isPaused ? "Resume" : "Pause"}
            </Button>
            
            <Button 
              onClick={handleReset}
              variant="outline"
              className="border-border/50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Monitor */}
      {(isRunning || progress > 0) && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span>Attack Progress</span>
            </CardTitle>
            <CardDescription>Real-time monitoring of penetration testing execution</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {/* Overall Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              {/* Individual Test Results */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Test Results</h4>
                {testResults.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground">{test.name}</h5>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className="w-32">
                            <Progress value={test.progress} className="h-2" />
                          </div>
                          <span className="text-xs text-muted-foreground">{test.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {test.findings > 0 && (
                        <Badge variant="outline" className="text-risk-high border-risk-high/20">
                          {test.findings} findings
                        </Badge>
                      )}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                        {test.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timing Info */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated time: 8 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Attacks configured: {numberOfAttacks[0]}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};