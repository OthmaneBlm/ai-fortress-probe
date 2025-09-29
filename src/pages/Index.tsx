import { useState } from "react";
import { Layout } from "@/components/Layout";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { ProjectForm } from "@/components/ProjectForm";
import { ScopeReview } from "@/components/ScopeReview";
import { AttackSimulation } from "@/components/AttackSimulation";
import { ResultsDashboard } from "@/components/ResultsDashboard";

type AppStep = "login" | "dashboard" | "create-project" | "scope-review" | "attack-simulation" | "results";

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

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("login");
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  const handleLogin = () => {
    setCurrentStep("dashboard");
  };

  const handleCreateProject = () => {
    setCurrentStep("create-project");
  };

  const handleProjectFormNext = (data: ProjectData) => {
    setProjectData(data);
    setCurrentStep("scope-review");
  };

  const handleScopeReviewNext = () => {
    setCurrentStep("attack-simulation");
  };

  const handleAttackSimulationComplete = () => {
    setCurrentStep("results");
  };

  const handleBackToDashboard = () => {
    setCurrentStep("dashboard");
    setProjectData(null);
  };

  if (currentStep === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "dashboard": return "Security Dashboard";
      case "create-project": return "Create Red Team Project";
      case "scope-review": return "Project Scope Review";
      case "attack-simulation": return "Attack Simulation";
      case "results": return "Assessment Results";
      default: return "RedTeam AI";
    }
  };

  return (
    <Layout title={getStepTitle()}>
      {currentStep === "dashboard" && (
        <Dashboard onCreateProject={handleCreateProject} />
      )}
      {currentStep === "create-project" && (
        <ProjectForm onNext={handleProjectFormNext} />
      )}
      {currentStep === "scope-review" && projectData && (
        <ScopeReview projectData={projectData} onNext={handleScopeReviewNext} />
      )}
      {currentStep === "attack-simulation" && (
        <AttackSimulation onComplete={handleAttackSimulationComplete} />
      )}
      {currentStep === "results" && (
        <ResultsDashboard onBackToDashboard={handleBackToDashboard} />
      )}
    </Layout>
  );
};

export default Index;
