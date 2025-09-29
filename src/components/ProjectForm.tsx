import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Target, Database, Zap } from "lucide-react";

interface ProjectFormData {
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

interface ProjectFormProps {
  onNext: (data: ProjectFormData) => void;
}

export const ProjectForm = ({ onNext }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    assetType: "",
    description: "",
    apiEndpoint: "",
    inputFormat: "",
    outputFormat: "",
    externalSources: false,
    internalKnowledge: false,
    ragImplementation: false,
    multiAgent: false,
    fewShotLearning: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const updateField = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-primary" />
            <span>AI Asset Configuration</span>
          </CardTitle>
          <CardDescription>
            Define the target AI system details for comprehensive red team assessment
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Project Details</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., ChatBot Security Assessment"
                    value={formData.projectName}
                    onChange={(e) => updateField("projectName", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assetType">Asset Type</Label>
                  <Select value={formData.assetType} onValueChange={(value) => updateField("assetType", value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chatbot">Chatbot/Conversational AI</SelectItem>
                      <SelectItem value="rag">RAG System</SelectItem>
                      <SelectItem value="multiagent">Multi-Agent System</SelectItem>
                      <SelectItem value="api">AI API Endpoint</SelectItem>
                      <SelectItem value="llm">Language Model</SelectItem>
                      <SelectItem value="recommendation">Recommendation Engine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the AI system's purpose, functionality, and key features..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="bg-background/50 min-h-[100px]"
                />
              </div>
            </div>

            {/* Technical Configuration */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Technical Specifications</span>
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">API Endpoint (Optional)</Label>
                  <Input
                    id="apiEndpoint"
                    placeholder="https://api.example.com/v1/chat"
                    value={formData.apiEndpoint}
                    onChange={(e) => updateField("apiEndpoint", e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="inputFormat">Input Format</Label>
                    <Input
                      id="inputFormat"
                      placeholder="e.g., JSON, Text, Images"
                      value={formData.inputFormat}
                      onChange={(e) => updateField("inputFormat", e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="outputFormat">Output Format</Label>
                    <Input
                      id="outputFormat"
                      placeholder="e.g., JSON, Text, Structured Data"
                      value={formData.outputFormat}
                      onChange={(e) => updateField("outputFormat", e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* System Characteristics */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">System Characteristics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ragImplementation"
                      checked={formData.ragImplementation}
                      onCheckedChange={(checked) => updateField("ragImplementation", checked)}
                    />
                    <Label htmlFor="ragImplementation" className="text-sm font-medium">
                      RAG Implementation
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiAgent"
                      checked={formData.multiAgent}
                      onCheckedChange={(checked) => updateField("multiAgent", checked)}
                    />
                    <Label htmlFor="multiAgent" className="text-sm font-medium">
                      Multi-Agent Architecture
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fewShotLearning"
                      checked={formData.fewShotLearning}
                      onCheckedChange={(checked) => updateField("fewShotLearning", checked)}
                    />
                    <Label htmlFor="fewShotLearning" className="text-sm font-medium">
                      Few-Shot Learning
                    </Label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="externalSources"
                      checked={formData.externalSources}
                      onCheckedChange={(checked) => updateField("externalSources", checked)}
                    />
                    <Label htmlFor="externalSources" className="text-sm font-medium">
                      External Data Sources
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="internalKnowledge"
                      checked={formData.internalKnowledge}
                      onCheckedChange={(checked) => updateField("internalKnowledge", checked)}
                    />
                    <Label htmlFor="internalKnowledge" className="text-sm font-medium">
                      Internal Knowledge Graphs
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90"
              >
                Continue to Scope Definition
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};