import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DashboardMock from "@/components/dashboard/DashboardMock";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            variant="outline" 
            onClick={() => setShowDashboard(false)}
          >
            ← Voltar para Landing
          </Button>
        </div>
        <DashboardMock />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      
      {/* Demo Dashboard Button */}
      <section className="py-20 bg-muted/30 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Prévia do Dashboard
          </h2>
          <p className="text-muted-foreground mb-8">
            Veja como seria a interface de gerenciamento dos seus documentos
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => setShowDashboard(true)}
          >
            Ver Dashboard Demo
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
