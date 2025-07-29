import { useState } from "react";
import InterApp from "@/components/InterApp";
import PIXComponent from "@/components/PIXComponent";
import StatementComponent from "@/components/StatementComponent";
import CardsComponent from "@/components/CardsComponent";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "pix" | "statement" | "cards">("home");

  const handleNavigateToPix = () => {
    setCurrentView("pix");
  };

  const handleNavigateToStatement = () => {
    setCurrentView("statement");
  };

  const handleNavigateToCards = () => {
    setCurrentView("cards");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  if (currentView === "pix") {
    return <PIXComponent onBack={handleBackToHome} />;
  }

  if (currentView === "statement") {
    return <StatementComponent onBack={handleBackToHome} />;
  }

  if (currentView === "cards") {
    return <CardsComponent onBack={handleBackToHome} />;
  }

  return (
    <InterApp 
      onNavigateToPix={handleNavigateToPix}
      onNavigateToStatement={handleNavigateToStatement}
      onNavigateToCards={handleNavigateToCards}
    />
  );
};

export default Index;
