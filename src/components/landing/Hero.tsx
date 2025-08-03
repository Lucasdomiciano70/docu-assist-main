import { Button } from "@/components/ui/button";
import { FileText, Shield, Users, Download } from "lucide-react";
import heroImage from "@/assets/hero-signature.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-secondary/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-medium">Assinatura Eletrônica Segura</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Assine Documentos
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              De Forma Profissional
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Plataforma completa para criação, assinatura e gestão de documentos. 
            Profissional, seguro e simples de usar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" className="group">
              <FileText className="h-5 w-5 group-hover:rotate-3 transition-transform" />
              Começar Gratuitamente
            </Button>
            <Button variant="professional" size="xl" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              <Users className="h-5 w-5" />
              Ver Como Funciona
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <FileText className="h-8 w-8 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Templates Prontos</h3>
              <p className="text-white/80 text-sm">Contratos, NDAs e acordos profissionais</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <Shield className="h-8 w-8 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Segurança Total</h3>
              <p className="text-white/80 text-sm">Assinatura eletrônica com validade legal</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <Download className="h-8 w-8 text-white mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">PDF Profissional</h3>
              <p className="text-white/80 text-sm">Geração automática com log de auditoria</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-700"></div>
      </div>
    </section>
  );
};

export default Hero;