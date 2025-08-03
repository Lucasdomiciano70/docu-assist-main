import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      
      {/* Demo Dashboard Button */}
      <section className="py-20 bg-muted/30 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comece Agora
          </h2>
          <p className="text-muted-foreground mb-8">
            Crie sua conta e comece a assinar documentos digitalmente
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate('/auth')}
            >
              Criar Conta Grátis
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate('/templates')}
            >
              Ver Templates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
